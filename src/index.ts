import express, { Express } from "express";
import dotenv from "dotenv";
import checkEnvVariable from "./utils/checkEnv";
import logger from "./utils/winston";
import connectDataBase from "./database";
import mainRouter from "./routes";

const app = express();
dotenv.config();

const port = checkEnvVariable("PORT");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", mainRouter);

connectDataBase().then((mongooseconnection) => {
  logger.info(
    `Database connected to \x1b[4m host:\x1b[4m${mongooseconnection.host}\x1b[4m:${mongooseconnection.port}\x1b[4m/${mongooseconnection.name}\x1b[0m `
  );
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
});
