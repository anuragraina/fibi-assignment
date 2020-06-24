## Pre-Requisites

1. Node.js must be installed.
2. MongoDB must be installed locally.

## Instructions

1. To install the required dependencies run:

### `npm install`

2. To keep the MongoDB server running, run:

### `mongod`

3. Finally, to run the application, open another terminal in the same directory and run:

### `node server.js`

## Routes

1. To add an image:
Request the following URL http://localhost:5000/api/add_image as POST with required queries and body data.

2. To get the images:
Request the following URL http://localhost:5000/api/get_images as GET with required queries.