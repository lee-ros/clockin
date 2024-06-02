import express from "express";
import { Express } from "express-serve-static-core";
import taskRouter from './routes/tasks';

export default function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use("/api/tasks", taskRouter);

  return app;
}
