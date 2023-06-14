const mongoose = require('mongoose');


const db = process.env.DB ? process.env.DB : 'mongodb://127.0.0.1:27017/test';

mongoose.connect(db)
  .then(() => console.log('Connected!'));