const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const data = require('../utils/data');
const { use } = require('../routes');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialDB',{
useNewUrlParser: true,
useUnifiedTopology: true,
});

const seedDB = async () => {
    try {
      // Clear existing data
      await Promise.all([
        User.deleteMany({}),
        Thought.deleteMany({})
      ]);

        // Seed users
        const usersEL = await User.insertMany(data.usersEL);

        // Seed thoughts
        const thoughtPromises = data.thoughts.map(async (thought) => {
            const user = usersEL.find((user) => user.username === thought.username);
            const newThought = new Thought({
              thoughtText: thought.thoughtText,
              username: thought.username,
              userId: user._id
            });
            user.thoughts.push(newThought);
            await newThought.save();
            await user.save();
            });

            await Promise.all(thoughtPromises);