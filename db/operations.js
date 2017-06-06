const mongoose = require('mongoose');
//builds schema and model
const blogModel = require('./model.js');
//REMEMBER YOU ARE WORKING WITH PROMISES HERE
const DbOperations = {

	insert: function(title,post,time){
		const _id = mongoose.Types.ObjectId();
		const blogInstance = new blogModel({_id,title,post,time});
		blogInstance.save().then(
			()=>{
				console.log("Entry successful...");
			},
			(err)=>{
				if(err){
					console.log("Error @ DbOPerations.insert...", err);
				}
			}
		)
	},

	
	update: function(obj,res){
		console.log("obj._id", obj._id);
		//find the desired post in the db and return to the client for updating
		blogModel.findByIdAndUpdate(obj._id, {title: obj.title, post: obj.post, time: obj.time}).then((data)=>{
			console.log("this is what was found in update: ", data);
			res.status(200).send(data);
		},(error)=>{
			console.log("operations.update encountered an error: ", error);
		})
	},

	delete: function(_id){
		blogModel.deleteOne({_id: _id}).then(()=>{console.log("the record was deleted.")},
			(error)=>{console.log("sorry, there was an error when deleting...", error)})
	},

	read: function(res){
		//just remmeber you passed in the entire response object, which probably wasnt good form, 
		//but at least you now know you cannot assign to an external declared variable and just expect 
		//the server to wait until the promise is resolved before returning it.
		blogModel.find({}).then(function(data){
			res.status(200).send(data);
		},(error)=>{
			console.log("there was an error retrieving data in operations.read()...", error);
		})
	}
}


module.exports = DbOperations;