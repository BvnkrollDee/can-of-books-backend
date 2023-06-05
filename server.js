"use strict";
// This enables strict mode, which helps catch common coding mistakes and ensures cleaner code.
require("dotenv").config();
// The dotenv module is used to load environment variables from a .env file into process.env.
// It allows you to store sensitive information or configuration details without hardcoding them in the code.
const express = require("express");
const cors = require("cors");
const books = require("./books");
// Importing required modules for the application: express, cors, and a local module called 'books'.

const mongoose = require("mongoose");
const bookModel = require("./books");
// Importing the Mongoose library, which provides a straightforward way to work with MongoDB.
// The 'bookModel' variable seems to be unnecessary since the 'books' module is already imported above.
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

app.get("/test", (request, response) => {
  response.send("test request received");
});
// Defining a route for '/test' that sends a response of 'test request received' when accessed.
// This is a simple test route to check if the server is working.

app.get("/books", async (req, res) => {
  const allBooks = await books.find({});
  res.send(allBooks);
});
app.post('/books', async (req, res) => {
  let book = req.body
  books.insertMany(book)
  .then(()=>{
    console.log("Added new book")
  }) // inserting data from the request into my mongoDB
  .catch((error) =>{  
    res.status(500).json({error: error.message})
  })
  res.send('ok')
})
// Defining a route for '/books' that retrieves all books from the database and sends them as a response.
// It uses the 'books' module, which likely contains the Mongoose model for the books collection.

app.delete('/books/:id', async (req, res) => {
const bookId = req.params.id

await books.findByIdAndDelete(bookId)
res.send('Read nigga reeaddddd - Uncle Rukus')
.catch((error) => {
  res.status(500).json({error: error.message})
})
})

app.put('/books/:id', async (req, res) => {
  let bookId = req.params.id
  let book = req.body

  let newBook = await books.findByIdAndUpdate(bookId, book, {
    new: true
  }) // updating an existing book with new data
  res.send(newBook)
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
// Starting the server and listening for incoming requests on the specified port.
// A message is logged to the console once the server starts successfully.