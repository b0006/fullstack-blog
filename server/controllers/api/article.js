const models = require('../../database/models');
const cache = require('memory-cache');

const { translit } = require('../../utils/translit');

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
        articles = await models.article.findAll({
          order: [['updatedAt', 'DESC']]
        });
      } catch (e) {
        res.send({
          status: false,
          error: JSON.stringify(e)
        });
        return false;
      }

      articles = articles.map(item => item.dataValues);
      updateCookieArticle(articles);
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

  static async addArticle(req, res) {
    const { title, content } = req.body;

    const value = translit(title);

    try {
      const [article, created] = await models.article.findOrCreate({
        where: {
          title,
          value
        },
        defaults: {
          title,
          text: content,
          value,
          keyWords: 'nodejs, react'
        }
      });
      if (created) {
        updateCookieArticle(article.dataValues);
        res.send({
          status: true
        });
      } else {
        res.send({
          status: false,
          error: 'Article already exist'
        });
      }
    } catch (e) {
      APP.log.error(e);
      res.send({
        status: false,
        error: e.toString()
      });
      return false;
    }
  }
}

function updateCookieArticle(newArticle) {
  if (newArticle.length) {
    cache.put(constants.CACHE_ARTICLE, newArticle);
  } else {
    const cacheArticle = cache.get(constants.CACHE_ARTICLE);
    if (cacheArticle) {
      cacheArticle.unshift(newArticle);
      cache.put(constants.CACHE_ARTICLE, cacheArticle);
    }
  }
}

function clearCookieArticle() {
  cache.del(constants.CACHE_ARTICLE);
}

module.exports = Article;
