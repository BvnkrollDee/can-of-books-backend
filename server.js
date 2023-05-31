'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const books = require('./books')

const mongoose = require('mongoose');
const bookModel = require('./books');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_DB)
const PORT = process.env.PORT || 3001;

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
