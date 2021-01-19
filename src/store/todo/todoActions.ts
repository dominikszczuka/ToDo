import { Message } from "constants/types/Message";
import { TodoType } from "constants/types/TodoTypes";
import * as todosTypes from "./todoTypes";

export const addTodos = (todo: TodoType): todosTypes.AddTodos => ({
  type: todosTypes.ADD_TODOS,
  payload: todo,
});

export const deleteTodos = (todo: TodoType): todosTypes.DeleteTodos => ({
  type: todosTypes.DELETE_TODOS,
  payload: todo,
});

export const setTodo = (todo: TodoType): todosTypes.SetTodo => ({
  type: todosTypes.SET_TODO,
  payload: todo,
});

export const setDone = (todo: TodoType): todosTypes.SetDone => ({
  type: todosTypes.SET_DONE,
  payload: todo,
});

export const fetchTodos = (
  callback: (message: string, typeMessage: Message) => void
): todosTypes.FetchTodos => ({
  type: todosTypes.FETCH_TODOS,
  payload: callback,
});

export const fetchTodosPending = (): todosTypes.FetchTodosPending => ({
  type: todosTypes.FETCH_TODOS_PENDING,
});

export const fetchTodosResolved = (
  todos: TodoType[]
): todosTypes.FetchTodosResolved => ({
  type: todosTypes.FETCH_TODOS_RESOLVED,
  payload: todos,
});

export const fetchTodosRejected = (
  errorMessage: string
): todosTypes.FetchTodosRejected => ({
  type: todosTypes.FETCH_TODOS_REJECTED,
  payload: errorMessage,
});
