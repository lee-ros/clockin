import { IDatabase, IMain } from "pg-promise";

const pgp: IMain = require("pg-promise")();
console.log(process.env.DB_URL);
if (!(typeof process.env.DB_URL === "string")) {
    throw Error("No Database URL found in the environment");
}

const db = pgp(process.env.DB_URL);
export { db, pgp };
