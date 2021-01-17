export interface ISchedule {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  index: number;
  createdAt: string;
  updatedAt: string;
}
