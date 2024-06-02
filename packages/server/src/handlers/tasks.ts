import { Request, Response } from "express-serve-static-core";

interface IDParams<IDType = number> {
  id: IDType;
}

interface TaskRequest {
  user_id: number;
  taskName?: string;
  taskDescription?: string;
}

interface Task extends TaskRequest {
  id: number;
  createdAt: Date;
}

const mockData: Task[] = [
  {
    id: 1,
    user_id: 1,
    taskName: "Dummy Task",
    taskDescription: "Some dummy task",
    createdAt: new Date(),
  },
  {
    id: 2,
    user_id: 1,
    taskName: "Dummy Task 2",
    taskDescription: "Some dummy task",
    createdAt: new Date(),
  },
];

export function getTasks(request: Request, response: Response<Task[]>) {
  return response.send(mockData);
}

export function createTask(
  request: Request<{}, {}, TaskRequest>,
  response: Response<Task>
) {
  const { user_id, taskName: taskeName, taskDescription } = request.body;
  const newTask: Task = {
    id: mockData.length + 1,
    user_id,
    taskName: taskeName,
    taskDescription,
    createdAt: new Date(),
  };

  mockData.push(newTask);
  return response.send(newTask);
}

export function updateTask(
  request: Request<IDParams, {}, TaskRequest>,
  response: Response<Task>
) {}

export function deleteTask(request: Request<IDParams>, response: Response) {}
