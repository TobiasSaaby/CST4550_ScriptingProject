import boto3
import time
import os

from botocore.exceptions import ClientError
from flask_restful import Resource

client_s3 = boto3.client('s3')
client_ec2 = boto3.client('ec2')

def UploadToBucket(filename):
    print("Uploading " + filename + " to bucket")
    
    try:
        client_s3.upload_file("VMS/" + filename, "theplatform-storagebucket", "vms/" + filename + ".ova")

        print("Success!")
    except ClientError as e:
        print("Error: " + e)
    return

def ImportVmImage(filename):
    print("Importing Image...")

    try:
        resp = client_ec2.import_image(
            Description='CTF ' + filename,
            DiskContainers=[
                {
                    'Description': 'CTF ova for' + filename,
                    'Format': 'ova',
                    'UserBucket': {
                        'S3Bucket': 'theplatform-storagebucket',
                        'S3Key': 'vms/' + filename + '.ova'
                    }
                },
            ],
        )

        return resp["ImportTaskId"]
    except ClientError as e:
        print("Error: " + e)
    return

def ImportTaskStatus(importId):
    print("Checking status...")

    try:
        while True:
            resp = client_ec2.describe_import_image_tasks(
                ImportTaskIds=[
                    importId
                ]
            )

            if resp["ImportImageTasks"][0]["Status"] == "completed":
                return { 'ImageId': resp["ImportImageTasks"][0]["ImageId"], 'BootMode': resp["ImportImageTasks"][0]["BootMode"]  }
            
            time.sleep(5)
    except ClientError as e:
        print("Error: ")
        print(e)
    return


f = open("Imports.txt", "a")

for filename in os.listdir("VMS"):
    print(filename)
    f.write(filename + "\n")

    UploadToBucket(filename)

    importId = ImportVmImage(filename)

    if "import" not in importId:
        print("import ID not found for " + filename + ". Exiting...")

    iRes = ImportTaskStatus(importId)

    f.write("CTFX_ACCESS=\"" + iRes["ImageId"] + "\"\n")
    f.write("CTFX_ACCESS_TYPE=\"" + iRes["BootMode"] + "\"\n\n")

f.close()