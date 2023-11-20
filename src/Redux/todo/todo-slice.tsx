import { createSlice } from '@reduxjs/toolkit';

import {
    createTodo,
    getTodosWeek,
} from './todo-operations';

import { ITodoState } from '../../components/types/todo/store-todo';

const initialState: ITodoState = {
  loading: false,
  error: '',
  message: '',
  todoList: [],
  arrayTodosWeek: [],
};

const todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        clearTodoError: store => {
            store.error = '';
        },
        clearTodoMessage: store => {
            store.message = '';
        },
        clearTodoList: store => {
            store.todoList = [];
        },
        createMessageConfirmation: (store, action) => {
            store.message = action.payload;
        },
        clearTodoStore: store => {
            store.loading = false;
            store.error = '';
            store.message = '';
            store.todoList = [];
            store.arrayTodosWeek = [];
        }
    },

    extraReducers: (builder) => {
        //add Todo
        builder.addCase(createTodo.pending, (store) => {
            store.loading = true;
            store.error = '';
        });
        builder.addCase(createTodo.fulfilled, (store, action) => {
            store.loading = false;
            store.message = action.payload.message;
        });
        builder.addCase(createTodo.rejected, (store, action: any) => {
            store.loading = false;
            store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
        });
        //get Week todos
        builder.addCase(getTodosWeek.pending, (store) => {
            store.loading = true;
            store.error = '';
        });
        builder.addCase(getTodosWeek.fulfilled, (store, action) => {
            store.loading = false;
            store.arrayTodosWeek = action.payload.arrayTodosWeek;
        });
        builder.addCase(getTodosWeek.rejected, (store, action: any) => {
            store.loading = false;
            store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
        });
    }
});

export default todo.reducer;
export const {
  clearTodoError,
  clearTodoMessage,
  clearTodoList,
  createMessageConfirmation,
  clearTodoStore,
} = todo.actions;