import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import router from "./auth/routes/auth.routes";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

export default app;