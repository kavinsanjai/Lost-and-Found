const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Angular/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User schema
const User = mongoose.model('User', {
  username: String,
  password: String  // (in production, you'd hash this)
});

// API: Login check
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in DB
  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// API: Register user (optional)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ success: true, message: 'User registered' });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
