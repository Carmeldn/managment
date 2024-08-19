var express = require("express");
var router = express.Router();
var { User } = require("../models");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const authenticateToken = require('../middleware/authentificateToken')
const SECRET_KEY = "za5ed7xSQ1W2s@po!k?56G";


router.post("/register", async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, prenom, email, password: hashedPassword });

    if (!user) {
      return res.status(401).json({ error: 'Registration failed' });
    }
    res.status(201).json({ message: "Successful registration" });
  } catch (error) {
    res.status(404).json({ error: 'Server not found' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Successful login', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data' });
});

module.exports = router;