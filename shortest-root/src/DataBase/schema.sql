DROP TABLE IF EXISTS events;
CREATE TABLE events (   
    id INTEGER PRIMARY KEY AUTOINCREMENT,      
    EventName TEXT NOT NULL,   
    UserIds TEXT NOT NULL,  
    HeadId TEXT NOT NULL,
    EventType TEXT NOT NULL,
    Adresses TEXT NOT NULL
);
