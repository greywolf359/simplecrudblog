const express = require('express');
const path = require('path');
const env = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const operations = require('./db/operations.js');

//--------------------mongoose

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', (error)=>{console.log("there was an error with mongodb...", error)});
db.once('open', ()=>{
	console.log("mongodb connection successful.");
})

//--------------------express
const app = new express;

console.log(env.node_env);
//process.env.NODE_ENV = "development";
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const stringParser = bodyParser.text();

app.use(express.static('public'));

//the public view -- on download to client, component makes an ajax call to the GET method
// /initialize to populate with data
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname, "public/index.html"));
})

//**************************************************************
//the blog owners backend
app.get('/backend', (req,res)=>{
	res.sendFile(path.join(__dirname, "public/backend.html"));
})

//the initialization of the backend, gets all documents within the db
//and sends them to the client
app.get('/initialize', (req,res)=>{
	operations.read(res);
})

//gets a new post from the blog owner and inserts it into the db
app.post('/backend', jsonParser, (req, res)=>{
	var {title, post, time} = req.body;
	operations.insert(title,post,time);
	res.send(req.body);
})

//retrieves an individual record for editing -- will require and _id arg
//remember you are passing the response object to the update method in db/operations.js
//so youre changing retrieve to update
app.post('/update', jsonParser,(req,res)=>{
	console.log("REQ.BODY",req.body);
	let {_id,title,post,time} = req.body;
	operations.update({_id, title,post,time},res);
})

//removes a document specified by the owner from the db
app.get('/remove', (req,res)=>{
	console.log("passed id:", req.query);
	operations.delete(req.query.id);
	//send back a new copy of the db after removal of desired record
	//you had to send back an object otherwise the ajax in the delete action throws a fit
	res.status(200).send({"_id": req.query.id});
})

app.listen(port, ()=>{
	console.log("listening on port...",port, "NODE_ENV: ", env.node_env);
});


/*
you need to build a schema, but how can you modularize this so you dont have to put it in your server file?

post verb but how to pass the data to server?
*/