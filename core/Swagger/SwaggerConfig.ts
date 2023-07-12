import * as dotenv from "dotenv";
dotenv.config();
import fetchAllArticles from "../../domain/Swagger/Articles/FetchAllArtciles";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Article API",
      version: "1.0.0",
      description: "Article Project to document your API",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    servers: [
      {
        url: process.env.localBaseUrl,
        description: "Local server",
      },
      {
        url: process.env.baseUrl,
        description: "Development Server",
      },
    ],
    paths: {
      "/fetch-articles": {
        get: fetchAllArticles,
      },
    },
  },
  apis: ["../../server.ts"],
};

export default swaggerOptions;
