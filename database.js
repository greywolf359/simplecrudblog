//import mongoose from 'mongoose';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',(error)=>{console.log("error connecting to mongo...", error)});

db.once('open', ()=>{console.log("connection successful...")});

module.exports = db;