import { apiBase } from '../../constants';

export default class ArticleService {
  getResource = async (url) => {
    const res = await fetch(apiBase + url);
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
}
