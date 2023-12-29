import { ITodoCreate, ITodoServer } from "./todo";

export interface ICreateTodoResponse {
    message: string,
}

export interface ITodosWeekResponse {
    arrayTodosWeek: ITodoServer[];
}

export interface ITodosSearchResponse {
    arrayTodosSearch: ITodoServer[];
}

export interface ITodosSynchronizeResponse {
    message: string,
}