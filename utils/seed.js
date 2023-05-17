const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const data = require('../utils/data');
const { use } = require('../routes');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialDB',{
useNewUrlParser: true,
useUnifiedTopology: true,
});

