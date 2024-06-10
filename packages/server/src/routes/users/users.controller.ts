import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import {
  idSchema,
} from "./users.schema";
import * as db from "./users.db";
import { z } from "zod";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { exclude } from "../../db/utils";

export async function getUserById(
  request: Request<z.infer<typeof idSchema>>,
  response: Response
) {
  const { id } = request.params;
  const user = await db.getUser({ id });

  if (!user) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  return response.status(StatusCodes.OK).send(exclude(user, ["password"]));
}

export async function createUser(
  request: Request<{}, {}, Prisma.UserCreateInput>,
  response: Response
) {
  const user = await db.createUser(request.body);
  if (!user) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  return response.status(StatusCodes.CREATED).send(exclude(user, ["password"]));
}

export async function updateUser(
  request: Request<z.infer<typeof idSchema>, {}, Prisma.UserUpdateInput>,
  response: Response
) {
  const user = await db.updateUser(request.params.id, request.body);
  if (!user) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  return response.status(StatusCodes.CREATED).send(exclude(user, ["password"]));
}

export async function deleteUser(request: Request<z.infer<typeof idSchema>>, response: Response) {
    await db.deleteUser(request.params.id);
    return response.status(StatusCodes.OK).send(ReasonPhrases.OK);
}
