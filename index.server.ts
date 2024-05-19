import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./connect_mongo";
import router from "./auth/routes/auth.routes";
import { mongo_path } from "./mongo.config";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const port = process.env.PORT || 5010;

const start = async (): Promise<void> => {
  try {
    const mongoUrl = mongo_path;
    if (!mongoUrl) {
      throw new Error("MONGO_PATH is not defined in environment variables");
    }
    await connectDB(mongoUrl);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
