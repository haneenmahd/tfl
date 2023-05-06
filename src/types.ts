export interface Match {
  id: string;
  name: string;
  modes: string[];
}

export interface Departure {
  id: string;
  lineName: string;
  destinationName: string;
  expectedArrival: string;
  modeName: string;
}
