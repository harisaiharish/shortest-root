import sqlite3
#import requests

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

with open('schema2.sql') as f:
    connection.executescript(f.read())

Cursor = connection.cursor()
Cursor.execute("SELECT name FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'")
print(Cursor.fetchall())

#cmd = "INSERT INTO events(EventName, EventType, UserIds, HeadId, Adresses) VALUES (?, ?, ?, ?, ?)"
#Cursor.execute(cmd, ["TYPE", "TESTT", "&", "123", "&"])
#connection.commit()

#Cursor.execute("SELECT * FROM events")
#print(Cursor.fetchone())

connection.commit()
connection.close()
