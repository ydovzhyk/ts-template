import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosCreateTodo,
  axiosEditTodo,
  axiosTodosWeek,
  axiosSearchTodo,
  axiosSynchronizeTodo,
} from '../../api/todo';

import { ICreateTodoResponse, ITodosWeekResponse, ITodosSearchResponse, ITodosSynchronizeResponse } from '../../components/types/todo/axios-todo';
import { ITodoCreate, ITodoSearch } from '../../components/types/todo/todo';

import { statusStopResetMessage } from './todo-slice';

export const createTodo = createAsyncThunk(
  'todo/create',
  async (userData: ITodoCreate, { rejectWithValue }) => {
    try {
        const data: ICreateTodoResponse = await axiosCreateTodo(userData);
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const editTodo = createAsyncThunk(
  'todo/edit',
  async (userData: ITodoCreate, { rejectWithValue }) => {
    try {
        const data: ICreateTodoResponse = await axiosEditTodo(userData);
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const getTodosWeek = createAsyncThunk(
  'todo/todosWeek',
  async (_, { rejectWithValue }) => {
    try {
      const data: ITodosWeekResponse = await axiosTodosWeek();
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const getSearchTodo = createAsyncThunk(
  'todo/search',
  async (userData: ITodoSearch, { rejectWithValue }) => {
    try {
      const data: ITodosSearchResponse = await axiosSearchTodo(userData);
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const synchronizeTodo = createAsyncThunk(
  'todo/synchronize',
  async (userData: ITodoCreate[], { rejectWithValue, dispatch }) => {
    try {
      const data: ITodosSynchronizeResponse = await axiosSynchronizeTodo(userData);
      dispatch(statusStopResetMessage(false));
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);