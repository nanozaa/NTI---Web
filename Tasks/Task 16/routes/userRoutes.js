const express = require('express');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, (req, res) => {
  res.status(200).json({
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