import { ITodoServer } from "./todo";

export interface ITodoState {
  loading: boolean;
  error: string;
  message: string;
  todoList: ITodoServer[];
  arrayTodosWeek: ITodoServer[];
  arrayTodosSearch: ITodoServer[];
  stopResetMessage: boolean;
}