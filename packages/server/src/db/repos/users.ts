import { IDatabase, IMain } from "pg-promise";
import { UUID } from "crypto";

import { users as sql } from "../sql";
import { User } from "../../types";

export class UsersRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  create(): Promise<null> {
    return this.db.none(sql.createTable);
  }

  drop(): Promise<null> {
    return this.db.none("DROP TABLE users");
  }

  add(values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    return this.db.one(sql.add, values);
  }

  delete(values: { id: UUID }): Promise<null> {
    return this.db.none(sql.delete, values.id);
  }
}
