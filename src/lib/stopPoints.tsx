import axios from 'axios';
import { API_URL, APP_KEY } from './constants';
import { FilteredStopPoints, StopPoint } from './types';
import { filterStopPoint, getStopPointCategory } from './utils';

export const getStopPoints = async (): Promise<StopPoint[]> => {
  const response = await axios.get(`${API_URL}/StopPoint/Type/TransportInterchange`, {
    params: {
      app_key: APP_KEY,
    },
  });

  return response.data;
}

export const filterStopPoints = (stopPoints: StopPoint[]): FilteredStopPoints => {
  // filter based on .stopType
  if (stopPoints.length !== 0) {
    const trainStops = stopPoints.filter(point =>
      filterStopPoint(point.modes, 'train')
    );
    const busStops = stopPoints.filter(point =>
      filterStopPoint(point.modes, 'bus')
    );
    const tramStops = stopPoints.filter(point =>
      filterStopPoint(point.modes, 'tram')
    );
    const metroStops = stopPoints.filter(point =>
      filterStopPoint(point.modes, 'metro')
    );

    return { trainStops, busStops, tramStops, metroStops };
  }

  return {
    trainStops: [],
    busStops: [],
    tramStops: [],
    metroStops: []
  }
}
