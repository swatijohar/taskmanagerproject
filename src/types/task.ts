export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  completed?: boolean;
}