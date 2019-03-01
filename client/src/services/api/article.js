import { apiBase } from '../../constants';

export default class ArticleService {
  getResource = async (url) => {
    const res = await fetch(apiBase + url);
    return res.json();
  };

  setResource = async (url, content) => {
    const res = await fetch(apiBase + url, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return res.json();
  };

  getList = () => {
    return this.getResource('/articles/getList')
      .then(res => {
        if (res.status){
          return res.articles;
        } else {
          throw res.error;
        }
      });
  };

  getArticleByValue = (value) => {
    return this.getResource('/article/' + value)
      .then(res => {
        if (res.status){
          return res.article;
        } else {
          throw res.error;
        }
      });
  };

  addArticle = (title, content) => {
    return this.setResource('/newArticle', {
      title,
      content
    }).then(res => {
      if (res.status){
        return res.status;
      } else {
        throw res.error;
      }
    });
  };

  deleteArticle = (articleId) => {
    return this.setResource('/deleteArticle', {
      articleId
    }).then(res => {
      if (res.status){
        return res.articles;
      } else {
        throw res.error;
      }
    });
  };
}
