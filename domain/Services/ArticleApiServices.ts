import axios from "axios";

const fetchArticles = async (query: any) => {
  try {
    let articleApi = process.env.ARTICLE_API;
    let queryString = formQueryString(query);
    let apiResponse = await axios.get(`${articleApi}${queryString}`);
    return apiResponse.data.articles;
  } catch (error) {
    throw error;
  }
};

const formQueryString = (query: any) => {
  let articleName = query.articleName;
  let pageSize = query.pageSize;
  let attributes = query.attributes;
  let langauage = query.lang;
  let country = query.country;
  let queryString = `?apikey=${process.env.APIKEY}&`;
  if (articleName) {
    queryString = queryString + `q=${articleName}&`;
  }
  if (pageSize) {
    queryString = queryString + `max=${pageSize}&`;
  }
  if (langauage) {
    queryString = queryString + `lang=${langauage}&`;
  }
  if (country) {
    queryString = queryString + `country=${attributes}`;
  }
  return queryString;
};

export default fetchArticles;
