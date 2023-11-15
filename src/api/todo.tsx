import { instance } from './auth';

import { ITodoCreate } from '../components/types/todo/todo';
import { ICreateTodoResponse } from '../components/types/todo/axios-todo';

export const axiosCreateTodo = async (userData: ITodoCreate): Promise<ICreateTodoResponse> => {
    const { data }: { data: ICreateTodoResponse } = await instance.post('/todo/create', userData);
    return data;
};