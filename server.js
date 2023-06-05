"use strict";
// This enables strict mode, which helps catch common coding mistakes and ensures cleaner code.
require("dotenv").config();
// The dotenv module is used to load environment variables from a .env file into process.env.
// It allows you to store sensitive information or configuration details without hardcoding them in the code.
const express = require("express");
const cors = require("cors");
const books = require("./books");
// Importing required modules for the application: express, cors, and a local module called 'books'.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const books = require('./books')

const mongoose = require('mongoose');
const bookModel = require('./books');

const app = express();
app.use(express.json());
app.use(cors());
// Creating an instance of the Express application and enabling Cross-Origin Resource Sharing (CORS) middleware.
// CORS allows requests from different origins to access the server's resources.

mongoose.connect(process.env.MONGO_DB);
// Connecting to the MongoDB database using the MONGO_DB environment variable defined in the .env file.

const PORT = process.env.PORT || 3001;
// Setting the port for the server. It will use the value of the PORT environment variable if available,
// otherwise it defaults to port 3001.

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', async (req, res) => {

  //connect
  const allBooks = await books.find({});
  //disconnect
res.send(allBooks)
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
// Starting the server and listening for incoming requests on the specified port.
// A message is logged to the console once the server starts successfully.
