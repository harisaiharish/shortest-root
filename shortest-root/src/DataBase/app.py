import db_CRUD
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/addEventDetails<address>', methods=['POST'])
def addAdress(address):
    pass

@app.route('/getEvent/<eventName>', methods=['GET'])
def getEvent(eventName):
    event = db_CRUD.getEvent(eventName)
    print("WOAHHHH", event)
    return jsonify(event)

@app.route('/getUser/<username>', methods=['GET'])
def getUser(username):
    user = db_CRUD.getUser(username)
    return jsonify(user)

@app.route('/addUser', methods=['POST'])
def addUser():
    userDetails = request.get_json()
    username = userDetails["username"]

    result = db_CRUD.newUser(username)
    return jsonify(result)

@app.route('/addEvent', methods=['POST'])
def addEvent():
    eventDetails = request.get_json()
    eventType = eventDetails["EventType"]
    eventName = eventDetails["EventName"]
    HeadID = eventDetails["HeadId"]

    result = db_CRUD.newEvent(eventType, eventName, HeadID)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=False)