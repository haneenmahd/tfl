import axios, { AxiosResponse } from 'axios';
import { API_URL, APP_KEY } from './constants';
import { IArrival, IStopPoint } from '../types';

/**
 * Search for stop points based on the parameter passed in and search for it.
 */
export const getStopPoints = async () => {
  const response: AxiosResponse<IStopPoint[]> = await axios.get(
    `${API_URL}/StopPoint/Type/TransportInterchange`,
    {
      params: {
        app_key: APP_KEY
      }
    }
  );

  return response.data;
};

export const getArrivals = async (stopPointId: string): Promise<IArrival[]> => {
  const response: AxiosResponse<IArrival[]> = await axios.get(
    `${API_URL}/StopPoint/${stopPointId}/Arrivals`
    , {
      params: {
        app_key: APP_KEY
      }
    });

  return response.data;
};
