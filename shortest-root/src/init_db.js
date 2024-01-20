const sqlite3 = require('sqlite3');
const Database = require('better-sqlite3')

const db = new sqlite3.Database('./db.sqlite');
/*
const newDB = Database('newDB.db')
newDB.exec('CREATE TABLE test (id INTEGER PRIMARY KEY AUTOINCREMENT, eventId TEXT NOT NULL);')
newDB.exec(`INSERT INTO test (eventId) VALUES ('woahhhhh')`)
output = newDB.exec('SELECT * FROM test')
console.log(output)
*/
db.run(`CREATE TABLE IF NOT EXISTS events (   
        id INTEGER PRIMARY KEY AUTOINCREMENT,      
        eventId TEXT NOT NULL,   
        UserIds TEXT NOT NULL,  
        HeadId TEXT NOT NULL,
        Modes TEXT NOT NULL,
        Type TEXT NOT NULL,
        Adresses TEXT NOT NULL);`  , function(err){
    if (err){
        console.log(err)
        console.log("what?")
    }
    console.log('JUST WORK ALREADY')

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL);`, function(err){
        if(err){
            console.log(err)
        }
        console.log("cool.")

        db.all("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'", function(err, data) {
            if (err){
                console.log(err)
                console.log("ERROR HAS OCCURED")
            }
            else{
                console.log(JSON.stringify(data))
                console.log("ABOVE ME IS THE DATA")
            }
        })
    })  
}) 
