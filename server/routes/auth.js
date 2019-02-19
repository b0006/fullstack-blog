const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

module.exports = router;
