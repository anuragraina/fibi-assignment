const express = require('express'),
	router = express.Router(),
	Image = require('../models/image');

router.post('/add_image', (req, res) => {
	const newImage = {
		url      : req.body.url,
		name     : req.body.name,
		type     : req.body.type,
		metadata : {
			size    : req.query.size,
			extType : req.query.extType
		}
	};

	Image.create(newImage, (err, addedImage) => {
		if (err) {
			res.send(err);
		} else {
			const object = {
				id       : addedImage._id,
				url      : addedImage.url,
				name     : addedImage.name,
				type     : addedImage.type,
				metadata : addedImage.metadata
			};

			res.send(object);
		}
	});
});

router.get('/get_images', (req, res) => {
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
				? (data = images.slice(offset, limit + offset))
				: (data = images.filter((image) => image.name === nameString).slice(offset, limit + offset));

			data.map((image, index) => {
				object[index] = {
					id       : image.id,
					url      : image.url,
					name     : image.name,
					type     : image.type,
					metadata : image.metadata
				};
			});

			res.send(object);
		}
	});
});

module.exports = router;
