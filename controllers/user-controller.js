const { User, Thought } = require('../models');


module.exports = {
  // Get all Users (GET)
  async getAllUsers(req, res) {
    try {
      const userEL = await User.find()
      .populate('thoughts')
      .populate('friends');
      res.json(userEL);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Single user by ID (GET)
  async getUserById(req, res) {
    try {
      const userEL = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
        
      if (!userEL) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(userEL);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Create a new user (POST)
  async createNewUser(req, res) {
    try {
      const userEL = await User.create(req.body);
      res.json(userEL);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user by ID (DELETE)
  async deleteUser(req, res) {
    try {
      const userEL = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userEL) {
        return res.status(404).json({ message: 'No User!' });
      }
      res.json(userEL);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user (PUT)
  async updateUser(req, res) {
    try {
      const userEL = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userEL) {
        return res.status(404).json({ message: 'No User!' });
      }

      res.json(userEL);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

