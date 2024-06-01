import express from "express";

export default function createApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.get("/", (req: express.Request, res: express.Response) => {
    return res.send("Hello from ExpressJS");
  });

  return app;
}
