import { createSlice } from '@reduxjs/toolkit';
import { getTechnicalData } from './technical-operations';
import { ITechnicalDataState } from '../../components/types/store/store-technical';

const initialState: ITechnicalDataState = {
  listEmail: [],
  loading: false,
  error: '',
  message: '',
  optionMenu: [],
  searchPage: 0,
  weekPage: 0,
};

const technicalData = createSlice({
    name: 'technicalData',
    initialState,
    reducers: {
        clearTechnicalDataError: store => {
            store.error = '';
        },
        clearTechnicalDataMessage: store => {
            store.message = '';
        },
        clearTechnicalDataListEmail: store => {
            store.listEmail = [];
        },
        clearTechnicalDataStore: store => {
            store.loading = false;
            store.error = '';
            store.message = '';
            store.listEmail= [];
        },
        saveSearchPage: (store, action) => {
            store.searchPage = action.payload;
        },
        saveWeekPage: (store, action) => {
            store.weekPage = action.payload;
        },
    },

    extraReducers: (builder) => {
        //get Technical Data
        builder.addCase(getTechnicalData.pending, (store) => {
            store.loading = true;
            store.error = '';
        });
        builder.addCase(getTechnicalData.fulfilled, (store, action) => {
            store.loading = false;
            store.listEmail = action.payload.listEmail;
            store.optionMenu = action.payload.optionMenu;
        });
        builder.addCase(getTechnicalData.rejected, (store, action: any) => {
            store.loading = false;
            store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
        });
    }
});

export default technicalData.reducer;

export const {
  clearTechnicalDataError,
  clearTechnicalDataMessage,
  clearTechnicalDataListEmail,
  clearTechnicalDataStore,
  saveSearchPage,
  saveWeekPage,
} = technicalData.actions;