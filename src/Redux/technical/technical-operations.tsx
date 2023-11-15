import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosGetTechnicalData,
} from '../../api/technicalData';

import { ITechnicalResponse } from '../../components/types/technical/axios-technical';

export const getTechnicalData = createAsyncThunk(
  'technical/data',
  async (_, { rejectWithValue }) => {
    try {
        const data: ITechnicalResponse = await axiosGetTechnicalData();
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);