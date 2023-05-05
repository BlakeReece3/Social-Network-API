const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Add a friend
router.post('/:id/friends', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const friendUser = await User.findById(req.body.friendId);

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentUser.friends.includes(friendUser._id)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    currentUser.friends.push(friendUser._id);
    friendUser.friends.push(currentUser._id);

    await currentUser.save();
    await friendUser.save();

    res.status(200).json({
      message: 'Friend added successfully',
      currentUser,
      friendUser
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a friend
router.delete('/:id/friends/:friendId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const friendUser = await User.findById(req.params.friendId);

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser.friends.includes(friendUser._id)) {
      return res.status(400).json({ message: 'Friend not found' });
    }

    currentUser.friends = currentUser.friends.filter(
      (friend) => friend.toString() !== friendUser._id.toString()
    );
    friendUser.friends = friendUser.friends.filter(
      (friend) => friend.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await friendUser.save();

    res.status(200).json({
      message: 'Friend removed successfully',
      currentUser,
      friendUser
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
