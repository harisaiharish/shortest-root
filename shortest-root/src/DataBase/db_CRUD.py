import sqlite3  # Create CONFIG file, Logs File, NLP, Fix Columns - JS Structure/function

#Func to return a connection to the employee database
def get_dbConn():
    conn = sqlite3.connect('database.db')
    return conn

def newUser(username = "default"):
    conn = get_dbConn()
    cur = conn.cursor()

    cmd = "INSERT INTO users(Username, events) VALUES (?, ?)"
    cur.execute(cmd, [username, "&"])

    conn.commit()

    return True

def newEvent(type, name, HeadID):
    conn = get_dbConn()
    cur = conn.cursor()

    cmd = "INSERT INTO events(EventName, EventType, UserIds, HeadId, Adresses) VALUES (?, ?, ?, ?, ?)"
    cur.execute(cmd, [name, type, "&", HeadID, "&"])

    conn.commit()

    return True

def getUser(username):
    conn = get_dbConn()
    cur = conn.cursor()

    cmd = "SELECT events FROM users where Username = ?"
    cur.execute(cmd, [username])
    return cur.fetchone()

def getEvent(eventName):
    conn = get_dbConn()
    cur = conn.cursor()

    cmd = "SELECT EventName, EventType, UserIds, HeadId, Adresses FROM events WHERE EventName = ?"
    cur.execute(cmd, [eventName])
    return cur.fetchone()

def addEventDetails(eventName, id, adress):
    conn = get_dbConn()
    cur = conn.cursor()

    cmd = "SELECT UserIds, Adresses FROM events WHERE EventName = ?"
    cur.execute(cmd, [eventName])
    data = cur.fetchone()

    cmd = "UPDATE events SET UserIds = ?, Adresses = ? WHERE EventName = ?"
    cur.execute(cmd, [data[0]+"&"+ id, data[1] + "&"+ adress, eventName])
    
    conn.commit()
    return True