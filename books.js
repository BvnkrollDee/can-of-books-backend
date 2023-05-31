const mongoose = require('mongoose'); // Import the mongoose library

const bookSchema = new mongoose.Schema({ // Define the schema for the book collection
    title: String, // Define the title field as a String
    description: String, // Define the description field as a String
    status: String // Define the status field as a String
});

const bookModel = mongoose.model('book', bookSchema); // Create a Mongoose model for the book collection

let books = [ // Create an array of book objects for testing purposes
    {title: 'test', description: 'test', status: 'test'},
    {title: 'test2', description: 'test2', status: 'test2'},
    {title: 'test3', description: 'test3', status: 'test3'}
];

bookModel.insertMany(books); // Insert the book objects into the book collection in the database

module.exports = bookModel; // Export the bookModel as a module
