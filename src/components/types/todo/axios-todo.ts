import { ITodoCreate, ITodoServer } from "./todo";

export interface ICreateTodoResponse {
    message: string,
}

export interface ITodosWeekResponse {
    arrayTodosWeek: ITodoServer[];
}