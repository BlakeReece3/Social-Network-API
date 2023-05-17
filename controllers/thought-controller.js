const { User, Thought } = require('../models');

module.exports = {
  // Get all Thoughts (GET)
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('user');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single Thought by ID (GET)
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('user');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create a new Thought (POST)
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // Update the user's thoughts array
      const user = await User.findById(thought.userId);
      user.thoughts.push(thought._id);
      await user.save();
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a Thought (PUT)
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Thought (DELETE)
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Remove the thought from the user's thoughts array
      const user = await User.findById(thought.userId);
      user.thoughts.pull(thought._id);
      await user.save();
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a Reaction to a Thought (POST)
  async addReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.push(req.body);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a Reaction from a Thought (DELETE)
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const reactionId = req.params.reactionId;
      thought.reactions.pull(reactionId);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};