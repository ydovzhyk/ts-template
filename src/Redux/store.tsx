import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth/auth-slice';
import todoSlise from './todo/todo-slice';
import technicalData from './technical/technical-slice';

const persistConfig = {
  key: 'auth-sid',
  storage,
  whitelist: ['sid', 'accessToken', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, auth);

// Ось оголошення типів для RootState та AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    todo: todoSlise,
    technicialData: technicalData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunkMiddleware),
});

export const persistor = persistStore(store);