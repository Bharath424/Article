import fetchArticles from "../../domain/Services/ArticleApiServices";
import BaseUseCase from "../BaseUseCase";
import { Request, Response } from "express";
import HttpError from "standard-http-error";
import { createClient } from "redis";
import { messages } from "../../domain/Constants/Strings";
import { codes } from "../../domain/Constants/HttpErrorCodes";

class FetchArticleUseCase extends BaseUseCase {
  constructor(request: Request, response: Response) {
    super(request, response);
  }

  // Vaidates the request object
  public validate() {
    let { articleName, apikey } = this.request.query;
    if (articleName === undefined) {
      throw new HttpError(codes.BAD_REQUEST, messages.ARTICLE_NAME_EMPTY);
    }
  }

  public async execute() {
    const client = createClient();
    client.on("error", (err) => {
      throw new HttpError(codes.BAD_REQUEST, err.message);
    });
    try {
      await client.connect();
      this.validate();
      let articleResponse;
      let searchKey: any = this.request.query?.searchKey;
      if (searchKey) {
        const value = await client.get(searchKey);
        if (value) {
          articleResponse = JSON.parse(value);
          await client.disconnect();
          return { code: codes.SUCCESS, articles: articleResponse };
        }
      }
      articleResponse = await this.fetchArticles(this.request.query);
      searchKey ? await client.set(searchKey, JSON.stringify(articleResponse)) : null;
      await client.disconnect();
      return { code: codes.SUCCESS, articles: articleResponse };
    } catch (error) {
      await client.disconnect();
      throw error;
    }
  }

  private async fetchArticles(query) {
    let articleResponse = await fetchArticles(query);
    if (articleResponse && query.searchKey) {
      articleResponse = await this.filterDatafromResponse(articleResponse, query);
    }
    return articleResponse;
  }

  private async filterDatafromResponse(articleResponse, query) {
    let results = [];
    if (query.searchKey) {
      let searchKey = query.searchKey.toLowerCase();
      articleResponse.filter((item) => {
        if (item.title.toLowerCase().includes(searchKey) || item.description.toLowerCase().includes(searchKey) || item.content.toLowerCase().includes(searchKey)) {
          results.push(item);
        }
      });
    }
    return results;
  }

  public static create(request: Request, response: Response) {
    const fetchArticleUseCase = new FetchArticleUseCase(request, response);
    return fetchArticleUseCase;
  }
}

export default FetchArticleUseCase;
