const express = require('express');

const app = express();
const path = require('path');

const fs = require('fs');

const db = require('./db/db.json');

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use( express.static('public'));

//HTML Routes
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "../notetaker/public/notes.html"))
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

app.listen(PORT, function() {
    console.log("App listening on PORT", PORT);
});


//API routes
app.get("/api/notes", function(req, res) {
    res.json(db)
        
});

var i = 1

app.post("/api/notes", function(req, res) {

    

    req.body.id = i++


    db.push(req.body);
    
    console.log(req.body);
    
    
    fs.writeFileSync("./db/db.json", JSON.stringify(db)); 

   
    res.json(req.body);
});


app.delete("/api/notes/:id", function (req, res) {

    db.splice(req.body.id, i);

    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t'));
    
    res.status(200).end();


});
