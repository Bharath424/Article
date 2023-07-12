require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Articles from "./api/Article/routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from "./core/Swagger/SwaggerConfig";

// Port Number
const port = process.env.port || 3000;

const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.set("port", process.env.port);

app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  }),
);

// Morgan Middleware for logging
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Article application." });
});

app.use("/api/swagger-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api", Articles);

const appListenCallBack = async () => {
  try {
    console.log("Server started on port " + port);
  } catch (error) {
    console.log("Server started on port " + port + " with error " + error);
  }
};
app.listen(port, appListenCallBack);
