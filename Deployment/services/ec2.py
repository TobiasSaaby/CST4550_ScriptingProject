import boto3

from flask import request

def Initiate(self):
    data = request.get_json()
    reservation = self.client.run_instances(
        ImageId = data["ImageId"],
        MaxCount = 1,
        MinCount = 1,
        InstanceType = data["InstanceType"],
        KeyName = data["KeyName"],
        SecurityGroupIds = data["SecurityGroupIds"],
        SubnetId = data["SubnetId"]
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
