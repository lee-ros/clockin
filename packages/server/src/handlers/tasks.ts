import { Request, Response } from "express-serve-static-core";
import { db } from "../db";
import { tasks } from "../db/sql";
import { randomUUID } from "crypto";
import { Task, TaskRequest } from '../types/tasks'
import { IDParams } from "../types/common";

const mockData: Task[] = [
  {
    id: 1,
    userId: 1,
    taskName: "Dummy Task",
    taskDescription: "Some dummy task",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    taskName: "Dummy Task 2",
    taskDescription: "Some dummy task",
    createdAt: new Date(),
  },
];

export async function getTasks(_request: Request, response: Response<Task[]>) {
  const values = await db.manyOrNone(tasks.byUser, { userId: 1});
  console.log(values);
  return response.send(mockData);
}

export async function createTask(
  request: Request<{}, {}, TaskRequest>,
  response: Response<Task>
) {
  const newTask: Task = await db.one(tasks.add, {userId: randomUUID(), taskName: "Task 1", taskDescription: ""});
  console.log(newTask);
  return response.send(mockData[1]);
}

export function updateTask(
  request: Request<IDParams, {}, TaskRequest>,
  response: Response<Task>
) {}

export function deleteTask(request: Request<IDParams>, response: Response) {}
