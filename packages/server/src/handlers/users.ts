import * as argon2 from "argon2";
import { Request, Response } from "express-serve-static-core";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { ErrorResponse, IDParams, UserRequest, UserResponse } from "../types";

export async function createUser(
  request: Request<{}, {}, UserRequest>,
  response: Response<UserResponse | ErrorResponse>
) {
  const hashedPassword = await argon2.hash(request.body.password);
  request.body.password = hashedPassword;

  const user = db.users.byEmail(request.body.email);
  if (user !== null) {
    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send({ error: "Email already exists" });
  }

  let newUser;
  try {
    newUser = await db.users.add({ ...request.body });
    console.log(`New user created with email ${newUser.email}`);
  } catch {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  const { id, firstName, lastName, email, createdAt } = newUser;
  return response
    .status(StatusCodes.CREATED)
    .send({ id, firstName, lastName, email, createdAt });
}

export async function deleteUser(
  request: Request<IDParams>,
  response: Response
) {
  // const user = db.users.byId(request.params.id);
  // if (user === null) {
  //   return response
  //     .status(StatusCodes.UNPROCESSABLE_ENTITY)
  //     .send({ error: "User not found" });
  // }

  // try {
  //   await db.users.delete(request.params.id);
  // } catch {
  //   return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  // }
  
  return response.status(StatusCodes.OK).send();
}
