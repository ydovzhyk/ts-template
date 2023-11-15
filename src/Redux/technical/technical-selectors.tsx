import { RootState } from '../store';

export const getTechnicalLoading = (state: RootState) => state.technicialData.loading;
export const getTechnicalError = (state: RootState) => state.technicialData.error;
export const getTechnicalMessage = (state: RootState) => state.technicialData.message;
export const getEmailList = (state: RootState) => state.technicialData.listEmail;
export const getOptionMenu = (state: RootState) => state.technicialData.optionMenu;