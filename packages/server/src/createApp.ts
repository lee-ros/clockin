import express from "express";
import { Express } from "express-serve-static-core";
import tasksRouter from "./routes/tasks";
import usersRouter from './routes/users/users.router';

export default function createApp(): Express {
  const app = express();

  app.use(express.json());

  // app.use("/api/tasks", tasksRouter);
  app.use("/api/users", usersRouter);

  return app;
}
