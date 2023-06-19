import boto3

from flask import request

def Initiate(self, name):
    reservation = self.client.run_instances(
        ImageId = name,
        MaxCount = 1,
        MinCount = 1,
        InstanceType = "t2.micro",
        KeyName = "EC2CLIKeyPair",
        SecurityGroupIds = ["sg-08e889680dc0d110e"],
        SubnetId = "subnet-07b2af8574f976c6b"
    )

    print(reservation)

    instance = reservation["Instances"][0]

    print(instance)

    return instance["InstanceId"]

def Terminate(self, name):
    response = self.client.terminate_instances(
        InstanceIds=[name]
    )

    return response['TerminatingInstances']


def Fetch(self, name):
    reservations = self.client.describe_instances(
        InstanceIds=[name]
    ).get("Reservations")

    return reservations[0]["Instances"][0].get("PublicIpAddress")
