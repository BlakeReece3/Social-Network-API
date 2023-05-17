const mongoose = require('mongoose');


const mongoConnect = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

connect(mongoConnect);


module.exports = mongoose.connection;
