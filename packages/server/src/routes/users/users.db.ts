import * as argon2 from "argon2";
import { Prisma, User } from "@prisma/client";

import prisma from "../../db";
import { handleDbError } from "../../db/utils";

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function getUsers(skip: number, limit: number): Promise<User[]> {
  return prisma.user.findMany({
    skip,
    take: limit,
  });
}

export async function getUser({
  id,
  email,
}: Prisma.UserWhereUniqueInput): Promise<User | null> {
  try {
    return await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ id }, { email }],
      },
    });
  } catch (e) {
    handleDbError(e);
    return null;
  }
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
}: Prisma.UserCreateInput): Promise<User | null> {
  const hashedPassword = await hashPassword(password);
  try {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
  } catch (e) {
    handleDbError(e);
    return null;
  }
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User | null> {
  if (data?.password) {
    data.password = await hashPassword(data.password.toString());
  }
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (e) {
    handleDbError(e);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (e) {
    handleDbError(e);
    return null;
  }
}
