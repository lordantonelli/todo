import { Category } from './category.model';

export interface Task {
  id: string;
  descripiton: string;
  categoryId: number;
  isFinished: boolean;
  dateCreated: Date;
  lastUpdated: Date;
}

export interface TaskFull extends Omit<Task, 'categoryId'> {
  category: Category;
}

export type TaskCreateDto = Omit<Task, 'id' | 'lastUpdated'>;
export type TaskUpdateDto = Omit<Task, 'id' | 'dateCreated'>;
