const express = require('express');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Protected profile data',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      phone: req.user.phone
    }
  });
});

module.exports = router;
