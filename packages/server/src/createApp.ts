import express from "express";
import { Express } from "express-serve-static-core";
import usersRouter from './routes/users.router';

export default function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use("/api/users", usersRouter);

  return app;
}
