require("dotenv").config({ path: "../../.env" });

import createApp from "./createApp";

const app = createApp();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running on port " + port));
