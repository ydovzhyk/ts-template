import { createSlice } from '@reduxjs/toolkit';

import {
    createTodo,
} from './todo-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  todoList: [],
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