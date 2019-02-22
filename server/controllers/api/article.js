const models = require('../../database/models');
const cache = require('memory-cache');

const CACHE_ARTICLE = 'articles';

class Article {
  static getList(req, res) {
    const cacheArticle = cache.get(CACHE_ARTICLE);
    if (cacheArticle) {
      console.log('Статьи взяты из кэша');

      res.send({
        status: true,
        articles: cacheArticle
      });
    } else {
      console.log('Статьи взяты из БД');

      models.article.findAll()
        .then(result => {

          const articles = result.map(item => item.dataValues);

          cache.put(CACHE_ARTICLE, articles);

          res.send({
            status: true,
            articles: articles
          });
        })
        .catch(err => {
          console.log('Error: ', err);
          res.send({
            status: false,
            error: err
          });
          return false;
        });
    }
  }
}

module.exports = Article;
