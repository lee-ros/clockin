type TaskBase = {
  userId: number;
  taskName?: string;
  taskDescription?: string;
};

export type TaskRequest = TaskBase;

export type Task = {
  id: number;
  createdAt: Date;
} & TaskRequest;
