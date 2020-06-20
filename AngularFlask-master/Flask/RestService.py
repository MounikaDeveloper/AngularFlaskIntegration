from flask import Flask, jsonify,render_template,request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from flask_sqlalchemy import SQLAlchemy

import requests
import json


app = Flask(__name__)
api=Api(app)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employee.sqlite3'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employee1.sqlite3'
db = SQLAlchemy(app)



class employee1(db.Model):
  id = db.Column('student_id', db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(50))
  email = db.Column(db.String(50))


def __init__(self, name, email):
  self.name = name
  self.email = email


db.create_all()

for x in employee1.query.all():
  employee= {
      "data": [
      {
          "id":x.id,
          "name": x.name,
          "email": x.email,

      }

      ]
  }


@app.route("/", methods=['GET'])
def new():
    return render_template('show_all.html')




@app.route("/employeeReport/", methods = ['GET'])
def EmployeeReport():
    global employee
    return jsonify([employee])

@app.route("/employeepost/",methods=['GET','POST'])
def post():
  data=request.get_json()
  id=data['id']
  name=data['name']
  email=data['email']
  db.session.add(employee1(id=id,name=name,email=email))
  db.session.commit()
  emp = employee1.query.all()
  

  return render_template('show_all.html')

if __name__ == '__main__':
    app.run(debug=True)

