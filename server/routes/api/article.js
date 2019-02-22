const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/api/article');

router.get('/getlist', articleController.getList);

module.exports = router;
