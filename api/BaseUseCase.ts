import { messages } from "../domain/Constants/Strings";
import UseCaseInterface from "./UseCaseInterface";
import { Request, Response } from "express";

abstract class BaseUseCase implements UseCaseInterface {
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  abstract execute();

  public async executeAndHandleErrors(): Promise<any> {
    try {
      let data: any = await this.execute();
      if (data == null) {
        data = {};
      }
      if (data.error) {
        const error = data;
        throw error;
      }
      const code = 200;
      data.code = code;
      this.response.status(code).json(data);
    } catch (error) {
      if (error != null) {
        let message = error.message;

        if (error.parent && error.parent.code === "23505") {
          message = messages.DUPLICATE_RECORD;
        }
        const code = error.code ? error.code : 400;
        const data = { code, message };
        this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
      } else {
        const data = {
          code: 400,
          message: "Unable to process your request, please try again",
        };
        this.response.status(400).json(data);
      }
    }
  }
}

export default BaseUseCase;
