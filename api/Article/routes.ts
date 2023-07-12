import express from "express";
import FetchArticleUseCase from "./FetchArticleUseCase";

const router = express.Router();

router.get("/fetch-articles", async (request: any, response: any) => {
  const fetchArticleUseCase = FetchArticleUseCase.create(request, response);
  await fetchArticleUseCase.executeAndHandleErrors();
});

export default router;
