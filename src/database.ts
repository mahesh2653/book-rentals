import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
import checkEnvVariable from "./utils/checkEnv";

dotenv.config();
const mongodbUrl = checkEnvVariable("MONGODB_URL");
const connectDataBase = async (): Promise<Connection> => {
  await mongoose.connect(mongodbUrl);

  return mongoose.connection;
};

export default connectDataBase;
