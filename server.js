"use strict";
// This enables strict mode, which helps catch common coding mistakes and ensures cleaner code.
require("dotenv").config();
// The dotenv module is used to load environment variables from a .env file into process.env.
// It allows you to store sensitive information or configuration details without hardcoding them in the code.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const books = require("./books");
// Importing required modules for the application: express, cors, and a local module called 'books'.
const verifyUser = require("./verifyUser")
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'https://canofbooksapi',
  issuerBaseURL: 'https://dev-172gbk7n2r6fv3td.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});



// const bookModel = require("./books");
// Importing the Mongoose library, which provides a straightforward way to work with MongoDB.
// The 'bookModel' variable seems to be unnecessary since the 'books' module is already imported above.

const app = express();
app.use(express.json());
app.use(cors());
// app.use(jwtCheck); // enforce on all endpoints
app.use(verifyUser)
// Creating an instance of the Express application and enabling Cross-Origin Resource Sharing (CORS) middleware.
// CORS allows requests from different origins to access the server's resources.
console.log(process.env.MONGO_DB)
let connection = async function (){
  try{
  await mongoose.connect(process.env.MONGO_DB)
  }
  catch(error) { console.log(error)}
}
// Connecting to the MongoDB database using the MONGO_DB environment variable defined in the .env file.

let disconnect = async function(){
  await mongoose.disconnect();
}
let seed = require("./seed")

const PORT = process.env.PORT || 3001;
// Setting the port for the server. It will use the value of the PORT environment variable if available,
// otherwise it defaults to port 3001.

app.get('/', async (req, res) => {
  try{ 
  res.send('You must think the sun shines out the crack of yo ass - Uncle Rukus')}
catch(error){
console.log('check this out' + error)
}
})

app.get("/test", async (request, response) => {
  await connection()
  console.log(request.user)
  disconnect()
  response.send("test request received");
});
// Defining a route for '/test' that sends a response of 'test request received' when accessed.
// This is a simple test route to check if the server is working.

app.get("/books", async (req, res) => {
  try {
    // Connect to MongoDB using the provided environment variable
    await mongoose.connect(process.env.MONGO_DB)

    // Log the user object from the request
    console.log(req.user)

    // Log the email property of the user object
    console.log(req.user?.email)

    // Find all books in the database that match the user's email
    let allBooks = []
    if(express.request.user.email){
      allBooks = await books.find({ email: req.user?.email }).exec()
    }else{
      allBooks = await books.find()
    }
    // Disconnect from the MongoDB
    disconnect() 

    // Send the retrieved books as the response
    res.send(allBooks);
  } catch (error) {
    // Log any errors that occur during the execution
    console.log(error)
  }
});

app.post('/books', async (req, res) => {
  // Establish a connection to MongoDB
  await connection()

  // Extract the book object from the request body
  let book = req.body

  // Assign the email property of the user object to the book
  book.email = req.user?.email

  // Insert the book object into the books collection
  await books.insertMany(book)
    .then(() => {
      console.log("Added new book")
    }) // Log a success message if the insertion is successful
    .catch((error) => {
      res.json({ error: error.message }); // Send an error response if there's an error
    })

  // Disconnect from MongoDB
  mongoose.disconnect();

  // Send a response indicating success
  res.send('ok')
})

// Defining a route for '/books' that retrieves all books from the database and sends them as a response.
// It uses the 'books' module, which likely contains the Mongoose model for the books collection.

app.delete('/books/:id', async (req, res) => {
  await connection()
const bookId = req.params.id

await books.findByIdAndDelete(bookId)
disconnect()
res.send('Read nigga reeaddddd - Uncle Rukus')
.catch((error) => {
  res.status(500).json({error: error.message})
})
})

app.put('/books/:id', async (req, res) => {
  await connection()
  let bookId = req.params.id
  let book = req.body

  let newBook = await books.findByIdAndUpdate(bookId, book, {
    new: true
  }) // updating an existing book with new data
  disconnect()
  res.send(newBook)
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
// Starting the server and listening for incoming requests on the specified port.
// A message is logged to the console once the server starts successfully.