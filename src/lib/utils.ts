import { CLIENT_RENEG_LIMIT } from "tls";
import { StopPoint, StopPointCategory, StopPointMode } from "../types";

export function getStopPointCategory(mode: StopPointMode): StopPointCategory {
  switch (mode) {
    case 'tube':
    case 'dlr':
    case 'overground':
    case 'tflrail':
      return 'train';
    case 'bus':
      return 'bus';
    case 'tram':
      return 'tram';
    case 'national-rail':
      return 'metro';
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
}

export function filterStopPointsByCategory(stopPoints: StopPoint[], category: StopPointCategory): StopPoint[] {
  return stopPoints.filter(stopPoint => {
    const categories = stopPoint.modes.map(mode => getStopPointCategory(mode));
    return categories?.includes(category);
  });
}
