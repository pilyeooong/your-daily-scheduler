export interface IUser {
  email: string;
  city: string;
  password: null;
  provider: string;
  is_admin: boolean;
  createdAt: string;
  updatedAt: string;
}
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
  startTime: Date;
  endTime: Date;
}

export interface ICovid {
  id: number;
  date: string;
  city: string;
  increasedCases: string;
  totalCases: string;
  createdAt: string;
  updatedAt: string;
}
