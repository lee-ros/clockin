import { IDParams } from "./common";

type UserBase = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserExtas = {
  createdAt: Date;
};

export type User = {
  password: string;
} & IDParams &
  UserBase &
  UserExtas;

export type UserRequest = {
  password: string;
} & UserBase;

export type UserResponse = IDParams & UserBase & UserExtas;
