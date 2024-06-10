import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handleDbError(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error(
      `Got error with code: ${error.code} and message: ${error.message}`
    );
  } else {
    console.log("Unkown prisma error occured");
  }
}

export function exclude<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}
