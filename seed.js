const mongoose = require('mongoose');
require('dotenv').config();
const books = require('./books');

async function seed (){
    await mongoose.connect(process.env.MONGO_DB)
    let newbooks = [ // Create an array of book objects for testing purposes
    new books({title: 'test', description: 'test', status: 'test', email: 'WhiteJesusFavoriteUncle@rukus.com'}),
    new books({title: 'test2', description: 'test2', status: 'test2', email: 'WhiteJesusFavoriteUncle@rukus.com'}),
    new books({title: 'test3', description: 'test3', status: 'test3', email: 'WhiteJesusFavoriteUncle@rukus.com'})
];

await books.insertMany(newbooks); // Insert the book objects into the book collection in the database
console.log('success')
mongoose.disconnect();
}
seed();