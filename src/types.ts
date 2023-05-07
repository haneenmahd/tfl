interface MatchQuality {
  matchQuality: number;
  matchType: string;
  confidence: number;
}


interface AdditionalProperty {
  category: string;
  key: string;
  sourceSystemKey: string;
  value: string;
}

interface Child {
  id: string;
  url: string;
  commonName: string;
  distance: number;
  placeType: string;
  additionalProperties: AdditionalProperty[];
  children: Child[];
  childrenUrls: string[];
  lat: number;
  lon: number;
  matchQuality: MatchQuality;
  name: string;
  naptanId: string;
  modes: string[];
}


export interface StopPoint {
  id: string;
  url: string;
  commonName: string;
  distance: number;
  placeType: string;
  additionalProperties: AdditionalProperty[];
  children: Child[];
  childrenUrls: string[];
  lat: number;
  lon: number;
  matchQuality: MatchQuality;
  name?: string;
  naptanId: string;
  modes: string[];
}


export interface Departure {
  id: string;
  lineName: string;
  destinationName: string;
  expectedArrival: string;
  modeName: string;
}
