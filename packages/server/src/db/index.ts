import { IDatabase, IInitOptions, IMain } from "pg-promise";
import { IExtentions } from "./repos";
import { UsersRepository } from "./repos";

type ExtendedProtocol = IDatabase<IExtentions> & IExtentions;

const initOptions: IInitOptions<IExtentions> = {
  extend(obj, dc: any) {
    obj.users = new UsersRepository(obj, pgp);
  },
};

const pgp: IMain = require("pg-promise")(initOptions);

console.log(process.env.DB_URL);
if (!(typeof process.env.DB_URL === "string")) {
  throw Error("No Database URL found in the environment");
}

const db: ExtendedProtocol = pgp(process.env.DB_URL);
export { db, pgp };
