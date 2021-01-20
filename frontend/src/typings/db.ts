export interface ISchedule {
  id: number;
  createdAt: string;
  updatedAt: string;
  todos: ITodo[];
}

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  index: number;
  createdAt: string;
  updatedAt: string;
}

export interface IEvent {
  id: number;
  date: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}