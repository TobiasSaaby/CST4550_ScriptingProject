import boto3

from flask_restful import Resource
from services.ec2 import Initiate, Terminate, Fetch

client = boto3.client('ec2')

class EC2Init(Resource):
    def __init__(self):
        self.client = client
    
    def post(self):
        return Initiate(self)
    
class EC2Term(Resource):
    def __init__(self):
        self.client = client

    def get(self, name):
        return Terminate(self, name)
    
class EC2Get(Resource):
    def __init__(self):
        self.client = client

    def get(self, name):
        return Fetch(self, name)