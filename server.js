var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
let fs = require('fs');

let handleRequest = (req, res) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function (err, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
};


app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"Invalid data":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"Invalid data":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.APP_SECRET){
        errors.push("Un Authenticate");
    }
    if (!req.body.APP_ID){
        errors.push("No App ID specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        USER_ID : req.body.USER_ID,
        APP_ID: req.body.APP_ID,
        APP_SECRET: md5(req.body.APP_SECRET),
        ACTION : req.body.ACTION,
        Content_Type : req.body.Content_Type,
        Accept : req.body.Accept
    }
    var sql ='INSERT INTO user (USER_ID, APP_ID, APP_SECRET,ACTION, Content_Type,Accept ) VALUES (?,?,?,?,?,?)'
    var params =[data.USER_ID, data.APP_ID, data.APP_SECRET,data.Action,data.Content_Type,data.Accept]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        USER_ID : req.body.USER_ID,
        APP_ID: req.body.APP_ID,
        APP_SECRET: md5(req.body.APP_SECRET),
        Action : req.body.ACTION,
        Content_Type : req.body.Content_Type,
        Accept : req.body.Accept
    }
    db.run(
        `UPDATE user set 
           USER_ID  = coalesce(?,USER_ID), 
           APP_ID = coalesce(?,APP_ID)
           APP_SECRET = COALESCE(?,APP_SECRET), 
           Action = coalesce(?,Action) ,
           Content_Type = coalesce(?,Content_Type) ,
           Accept =  coalesce(?,Accept) ,
           WHERE id = ?`,
           [data.USER_ID, data.APP_ID, data.APP_SECRET,data.Action,data.Content_Type,req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


//Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Hey"})
 });

