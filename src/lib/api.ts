import axios, { AxiosResponse } from 'axios';
import { API_URL, APP_KEY } from './constants';
import { Departure, StopPoint } from '../types';

export const getStopPoints = async () => {
  const response: AxiosResponse<StopPoint[]> = await axios.get(
    `${API_URL}/StopPoint/Type/TransportInterchange`,
    {
      params: {
        app_key: APP_KEY
      }
    }
  );

  return response.data;
};

export const getDepartures = async (stopPointId: string) => {
  const response: AxiosResponse<{ departures: Departure[] }> = await axios.get(
    `${API_URL}/StopPoint/${stopPointId}/Departures`
    , {
      params: {
        app_key: APP_KEY
      }
    });

  return response.data.departures;
};