import * as argon2 from "argon2";
import { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

import { IDParams, UserRequest, UserResponse } from "../types";
import { db } from "../db";

export async function createUser(
  request: Request<{}, {}, UserRequest>,
  response: Response<UserResponse>
) {
  const hashedPassword = await argon2.hash(request.body.password);
  request.body.password = hashedPassword;

  let newUser;
  try {
    newUser = await db.users.add({ ...request.body });
    console.log(`New user created with email ${newUser.email}`);
  } catch {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  const { id, firstName, lastName, email, createdAt } = newUser;
  return response.status(StatusCodes.CREATED).send({ id, firstName, lastName, email, createdAt });
}

export async function deleteUser(
  requst: Request<IDParams>,
  response: Response
) {
  try {
    await db.users.delete({ id: requst.params.id });
  } catch {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
  return response.status(StatusCodes.OK).send();
}
