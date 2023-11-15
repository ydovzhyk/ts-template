import { instance } from './auth';

import { ITechnicalResponse } from '../components/types/technical/axios-technical';

export const axiosGetTechnicalData = async (): Promise<ITechnicalResponse> => {
    const { data }: { data: ITechnicalResponse } = await instance.post('/technical/data');
    return data;
};