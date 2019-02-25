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
}

module.exports = Article;
