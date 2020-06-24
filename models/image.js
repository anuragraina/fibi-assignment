const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	url      : { type: String, required: true },
	name     : { type: String, required: true },
	type     : { type: String, required: true },
	metadata : {
		size    : { type: String },
		extType : { type: String }
	}
});

module.exports = mongoose.model('Image', imageSchema);
