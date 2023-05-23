const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const data = require('../utils/data');

mongoose.connect('mongodb://localhost:27017/socialapi', {
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
    const usersEL = await User.insertMany(data.users);

    // Seed thoughts
    const thoughtPromises = data.thoughts.map(async (thought) => {
      const userEL = usersEL.find((user) => user.username === thought.username);
      const newThought = new Thought({
        thoughtText: thought.thoughtText,
        username: thought.username,
        userId: userEL._id
      });
      userEL.thoughts.push(newThought);
      await newThought.save();
    });

    await Promise.all(thoughtPromises);

    // Save users after all thoughts have been saved
    for (const userEL of usersEL) {
      await userEL.save();
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
