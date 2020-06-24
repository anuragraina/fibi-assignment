const express = require('express'),
	app = express(),
	port = process.env.PORT || 5000,
	mongoose = require('mongoose'),
	apiRoutes = require('./routes/api');

mongoose.connect('mongodb://localhost:27017/image-api', {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useFindAndModify   : false
});

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to Image API...');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
	console.log('listening on port ' + port);
});
