const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User   = require('../models/User');  

// POST /api/register
router.post('/register', async (req, res) => 
  {
  const { fullName, email, password, confirm } = req.body;

  if (!fullName?.trim() || !email?.trim() || !password)
    return res.status(400).json({ error: 'Please fill in all fields' });
  if (password !== confirm)
    return res.status(400).json({ error: 'Passwords do not match' });

  try 
  {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hash });
    return res.status(201).json({ message: 'OK' });
  } catch (err) 
  {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Email is already used' });
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
