import { CLIENT_RENEG_LIMIT } from "tls";
import { StopPointCategory, StopPointMode } from "./types";

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

export function filterStopPoint(modes: StopPointMode[], category: StopPointCategory) {
  const filteredModes = modes.filter(mode => getStopPointCategory(mode) === category);
  const isMatching = filteredModes.some(mode => getStopPointCategory(mode) === category);

  console.log(filteredModes);
  return isMatching;
}
