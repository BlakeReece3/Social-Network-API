// User routes
const userRoutes = (app) => {
    app.get('/api/users', async (req, res) => {
      try {
        const users = await User.find().populate('thoughts friends');
        res.json(users);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.get('/api/users/:userId', async (req, res) => {
      try {
        const user = await User.findById(req.params.userId).populate('thoughts friends');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.post('/api/users', async (req, res) => {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.put('/api/users/:userId', async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.delete('/api/users/:userId', async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        await Thought.deleteMany({ username: user.username });
        res.json({ message: 'User deleted' });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
      try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (user.friends.includes(req.params.friendId)) {
          return res.status(400).json({ message: 'Friend already added' });
        }
        user.friends.push(req.params.friendId);
        await user.save();
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  
    app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
      try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.friends.pull(req.params.friendId);
        await user.save();
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
      }
    });
  };
  
  module.exports = userRoutes;
  