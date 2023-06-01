'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const books = require('./books')

const mongoose = require('mongoose');
const seed = require('./seed');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {
  
  response.send('test request received')
  
})

app.get('/books', async (req, res) => {
  
  await mongoose.connect(process.env.MONGO_DB)
  //connect
  const allBooks = await books.find({});
  mongoose.disconnect();


  //disconnect
  res.send(allBooks)
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
