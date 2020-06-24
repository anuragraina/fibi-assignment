const express = require('express'),
	app = express(),
	port = process.env.PORT || 5000,
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/image-api', {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useFindAndModify   : false
});

const imageSchema = new mongoose.Schema({
	url  : String,
	name : String,
	type : String
});

const Image = mongoose.model('Image', imageSchema);

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to Image API...');
});

app.post('/api/add_image', (req, res) => {
	const newImage = {
		url  : req.body.url,
		name : req.body.name,
		type : req.body.type
	};

	Image.create(newImage, (err, addedImage) => {
		if (err) {
			res.send(err.message);
		} else {
			const object = {
				id   : addedImage._id,
				url  : addedImage.url,
				name : addedImage.name,
				type : addedImage.type
			};

			res.send(object);
		}
	});
});

app.get('/api/get_images', (req, res) => {
	Image.find({}, (err, images) => {
		if (err) {
			res.send(err.message);
		} else {
			let offset = 0,
				limit = images.length,
				nameString = '',
				object = [];

			req.query.offset !== undefined && (offset = parseInt(req.query.offset));
			req.query.limit !== undefined && (limit = parseInt(req.query.limit));
			req.query.nameString !== undefined && (nameString = req.query.nameString);

			nameString === ''
				? (data = images.slice(offset, limit))
				: (data = images.filter((image) => image.name === nameString).slice(offset, limit));

			data.map((image, index) => {
				object[index] = {
					id   : image.id,
					url  : image.url,
					name : image.name,
					type : image.type
				};
			});

			res.send(object);
		}
	});
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});
