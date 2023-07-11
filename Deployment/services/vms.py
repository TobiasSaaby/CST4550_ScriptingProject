import boto3

from botocore.exceptions import ClientError
from flask_restful import Resource

def UploadToBucket(client, filename):
    try:
        resp = client.upload_file(filename, "theplatform-storagebucket", "vms/CTFForensics.ova")
        print("Success: ")
        print(resp)
    except ClientError as e:
        print("Error: ")
        print(e)
    return

def ImportVmImage(client):
    try:
        resp = client.import_image(
            Description='Forensics CTF',
            DiskContainers=[
                {
                    'Description': 'CTF ova for Forensics CTF',
                    'Format': 'ova',
                    'UserBucket': {
                        'S3Bucket': 'theplatform-storagebucket',
                        'S3Key': 'vms/CTFForensics.ova'
                    }
                },
            ],
        )
        print("Success: ")
        print(resp["ImportTaskId"])
    except ClientError as e:
        print("Error: ")
        print(e)
    return

def ImportTaskStatus(client):
    try:
        resp = client.describe_import_image_tasks(
            ImportTaskIds=[
                'import-ami-02ab96bd1fddf4139'
            ]
        )
        print("Success: ")
        print(resp["ImportImageTasks"][0]["StatusMessage"])
    except ClientError as e:
        print("Error: ")
        print(e)
    return


client_s3 = boto3.client('s3')
client_ec2 = boto3.client('ec2')
filename = "/home/_Syn/Downloads/CTFForensics.ova"
# print("Uploading to bucket")
# UploadToBucket(client_s3, filename)
# print("Importing Image")
# ImportVmImage(client_ec2)
# print("Checking status")
# ImportTaskStatus(client_ec2)