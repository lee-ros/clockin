import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.get("/", (req: express.Request, res: express.Response) => {
    return res.send("Hello from ExpressJS");
});

app.listen(port, () => console.log("Server is running on port " + port));
