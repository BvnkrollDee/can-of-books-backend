const mongoose = require('mongoose'); // Import the mongoose library

const bookSchema = new mongoose.Schema({ // Define the schema for the book collection
    title: String, // Define the title field as a String
    description: String, // Define the description field as a String
    status: String, // Define the status field as a String
    email: String   // Define the email field as a String
});

const bookModel = mongoose.model('book', bookSchema,); // Create a Mongoose model for the book collection



module.exports = bookModel; // Export the bookModel as a module
