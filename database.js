var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "FetchDb.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (
            USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            APP_ID text, 
            APP_SECRET text UNIQUE, 
            ACTION text, 
            Content_Type text,
            Accept text,
            CONSTRAINT APP_SECRET_unique UNIQUE (APP_SECRET)
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO user (USER_ID,APP_ID, APP_SECRET, ACTION,Content_Type,Accept) VALUES (?,?,?,?,?,?)'
            db.run(insert, ["1","1234APPID1234","enwdj3bshwer43bjhjs9ereuinkjcnsiurew8s","user.update","application/json","*"])
            // db.run(insert, ["user","user@example.com",md5("user123456")])
        }
    })  
    }
})


module.exports = db

