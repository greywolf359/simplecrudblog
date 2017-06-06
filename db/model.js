const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: {type: String, required: [true, "A title is required"]},
	post: {type: String, required: [true, "A post entry is required"]},
	time: {type: Number, required: [true, "A time is required"]}
});

const blogModel = mongoose.model('BlogModel',postSchema);

module.exports = blogModel;