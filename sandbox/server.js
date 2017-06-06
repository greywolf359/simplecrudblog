const express = require('express');
const path = require('path');

const app = new express;

app.get('/',function(req,res){
		res.sendFile(path.join(__dirname, 'page.html'));
});

app.listen(4000, ()=>{
	console.log("listening on port 4000...")
});