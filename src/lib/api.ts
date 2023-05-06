import axios from 'axios';
import { API_URL, APP_KEY } from './constants';
import { StopPoint } from './types';

export const getStopPoints = async (): Promise<StopPoint[]> => {
  const response = await axios.get(`${API_URL}/StopPoint/Type/TransportInterchange`, {
    params: {
      app_key: APP_KEY,
    },
  });

  return response.data;
}
