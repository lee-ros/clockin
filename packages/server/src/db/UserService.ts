import * as argon2 from "argon2";
import { Prisma, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client/extension";

export default class UserService {
    constructor(private prisma: PrismaClient) {}

    private handleError(error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.error(`Got error with code: ${error.code} and message: ${error.message}`);
          } else {
            console.log("Unkown prisma error occured");
          }
    }
    
    private async hashPassword(password: string): Promise<string> {
      return argon2.hash(password);
    }
    
    async getUsers(skip: number, limit: number): Promise<User[]> {
      return this.prisma.user.findMany({
        skip,
        take: limit,
      });
    }
    
    async getUser({
      id,
      email,
    }: Prisma.UserWhereUniqueInput): Promise<User | null> {
      try {
        return await this.prisma.user.findFirstOrThrow({
          where: {
            OR: [{ id }, { email }],
          },
        });
      } catch (e) {
        this.handleError(e);
        return null;
      }
    }
    
    async createUser({
      email,
      password,
      firstName,
      lastName,
    }: Prisma.UserCreateInput): Promise<User | null> {
      const hashedPassword = await this.hashPassword(password);
      try {
        return await this.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
          },
        });
      } catch (e) {
        this.handleError(e);
        return null;
      }
    }
    
    async updateUser(
      id: string,
      data: Prisma.UserUpdateInput
    ): Promise<User | null> {
      if (data?.password) {
        data.password = await this.hashPassword(data.password.toString());
      }
      try {
        return await this.prisma.user.update({
          where: {
            id,
          },
          data,
        });
      } catch (e) {
        this.handleError(e);
        return null;
      }
    }
    
    async deleteUser(id: string) {
      try {
        return await this.prisma.user.delete({
          where: { id },
        });
      } catch (e) {
        this.handleError(e);
        return null;
      }
    }
}
