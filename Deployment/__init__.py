from flask import Flask
from apis.ec2 import EC2Init, EC2Term, EC2Get
from flask_restful import Api

app = Flask(__name__)

api = Api(app)

api.add_resource(EC2Get, '/ec2/<string:name>')
api.add_resource(EC2Init, '/ec2/init/<string:name>')
api.add_resource(EC2Term, '/ec2/term/<string:name>')

if __name__ == '__main__':
    app.run(debug=True)  