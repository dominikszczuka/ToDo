export interface BasicTodo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
}

export interface TodoType extends BasicTodo {
  userId: number;
  completed: boolean;
}

export interface FetchTodoResponse {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type Priority = "high" | "medium" | "low";

export type Category = "lifestyle" | "work" | "house" | "car" | "children";
