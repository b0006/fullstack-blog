const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/api/article');

router.get('/articles/getlist', articleController.getList);

router.get('/article/:value', articleController.getArticleByValue);

router.post('/newArticle', articleController.addArticle);

router.post('/deleteArticle', articleController.deleteArticle);

module.exports = router;
