import { createSlice } from '@reduxjs/toolkit';

import {
    createTodo,
    editTodo,
    getTodosWeek,
    getSearchTodo,
} from './todo-operations';

import { ITodoState } from '../../components/types/todo/store-todo';

const initialState: ITodoState = {
  loading: false,
  error: '',
  message: '',
  todoList: [],
  arrayTodosWeek: [],
  arrayTodosSearch: [],
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
        },
        saveArrayTodosWeek: (store, action) => {
            store.arrayTodosWeek = action.payload;
        },
        saveArrayTodosSearch: (store, action) => {
            store.arrayTodosSearch = action.payload;
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
        //edit Todo
        builder.addCase(editTodo.pending, (store) => {
            store.loading = true;
            store.error = '';
        });
        builder.addCase(editTodo.fulfilled, (store, action) => {
            store.loading = false;
            store.message = action.payload.message;
        });
        builder.addCase(editTodo.rejected, (store, action: any) => {
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
        //get Search todos
        builder.addCase(getSearchTodo.pending, (store) => {
            store.loading = true;
            store.error = '';
        });
        builder.addCase(getSearchTodo.fulfilled, (store, action) => {
            store.loading = false;
            store.arrayTodosSearch = action.payload.arrayTodosSearch;
        });
        builder.addCase(getSearchTodo.rejected, (store, action: any) => {
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
  saveArrayTodosWeek,
  saveArrayTodosSearch,
} = todo.actions;