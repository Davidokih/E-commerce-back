const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.URL;
mongoose.connect(url).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;