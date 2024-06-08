import { mongo_path } from "./mongo.config";
import connectDB from "./connect_mongo";
import app from "./app";

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