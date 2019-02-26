const models = require('../../database/models');
const cache = require('memory-cache');

const constants = require('../../constants').articleConstants;

class Article {
  static async getList(req, res) {
    const cacheArticle = cache.get(constants.CACHE_ARTICLE);
    let articles = null;
    if (cacheArticle) {
      APP.log.info('Articles get from cache');
      articles = cacheArticle;
    } else {
      APP.log.info('Articles get from DB');

      try {
        articles = await models.article.findAll();
      } catch (e) {
        res.send({
          status: false,
          error: JSON.stringify(e)
        });
        return false;
      }

      articles = articles.map(item => item.dataValues);
      cache.put(constants.CACHE_ARTICLE, articles);
    }

    res.send({
      status: true,
      articles
    });
  }

  static async getArticleByValue(req, res) {
    const articleValue = req.params.value;
    let article = null;

    const cacheArticles = cache.get(constants.CACHE_ARTICLE);
    if (cacheArticles) {
      article = cacheArticles.find(item => item.value === articleValue);
    }

    if (!article) {
      let articleDb = null;
      try {
        articleDb = await models.article.findOne({
          where: {
            value: articleValue
          }
        });
      } catch (e) {
        APP.log.error(e);
        res.send({
          status: false,
          error: JSON.stringify(e)
        });
        return false;
      }

      if (!articleDb) {
        res.send({
          status: false,
          error: 'Article is\'t exist'
        });
        return false;
      }

      article = articleDb.dataValues;
    }

    res.send({
      status: true,
      article
    });
  }
}

module.exports = Article;
