import * as argon2 from "argon2";
import { Request, Response } from "express-serve-static-core";
import { User, UserRequest, UserResponse } from "../types/users";
import { db } from "../db";
import { users as sql } from "../db/sql";
import { IDParams } from "../types/common";

export async function createUser(
  request: Request<{}, {}, UserRequest>,
  response: Response<UserResponse>
) {
  const hashedPassword = await argon2.hash(request.body.password);
  request.body.password = hashedPassword;

  const newUser = await db.users.add({ ...request.body });

  const { id, firstName, lastName, email, createdAt } = newUser;
  console.log({ id, firstName, lastName, email, createdAt });
  return response.send({ id, firstName, lastName, email, createdAt });
}

export async function deleteUser(
  requst: Request<IDParams>,
  response: Response
) {
  await db.users.delete({ id: requst.params.id });
  return response.status(200).send();
}