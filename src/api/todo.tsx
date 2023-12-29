import { instance } from './auth';

import { ITodoCreate, ITodoSearch } from '../components/types/todo/todo';
import { ICreateTodoResponse, ITodosWeekResponse, ITodosSearchResponse, ITodosSynchronizeResponse } from '../components/types/todo/axios-todo';

export const axiosCreateTodo = async (userData: ITodoCreate): Promise<ICreateTodoResponse> => {
    const { data }: { data: ICreateTodoResponse } = await instance.post('/todo/create', userData);
    return data;
};

export const axiosEditTodo = async (userData: ITodoCreate): Promise<ICreateTodoResponse> => {
    const { data }: { data: ICreateTodoResponse } = await instance.post('/todo/edit', userData);
    return data;
};

export const axiosTodosWeek = async (): Promise<ITodosWeekResponse> => {
    const { data }: { data: ITodosWeekResponse } = await instance.post('/todo/todosWeek');
    return data;
};

export const axiosSearchTodo = async (userData: ITodoSearch): Promise<ITodosSearchResponse> => {
    const { data }: { data: ITodosSearchResponse } = await instance.post('/todo/search', userData);
    return data;
};

export const axiosSynchronizeTodo = async (userData: ITodoCreate[]): Promise<ITodosSynchronizeResponse> => {
    const { data }: { data: ITodosSynchronizeResponse } = await instance.post('/todo/synchronize', userData);
    return data;
};