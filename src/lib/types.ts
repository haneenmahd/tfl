export type StopPointMode = 'tube' | 'overground' | 'dlr' | 'tflrail' | 'tram' | 'national-rail' | 'bus' | 'river-bus' | 'emirates-air-line';

export type StopPointCategory = 'train' | 'bus' | 'tram' | 'metro';

export type StopPoint = {
  '$type': string
  naptanId: string
  modes: StopPointMode[];
  placeType: string;
  commonName: string;
  additionalProperties: string;
  icsCode: string
  stopType: string
  hubNaptanCode: string
  lines: Line[]
  lineGroup: LineGroup[]
  lineModeGroups: LineModeGroup[]
  lat: number
  lon: number
  children: StopPoint[];
}

export type Line = {
  '$type': string
  id: string
  name: string
  commonName?: string
  uri: string
  type: string
  crowding: {
    '$type': string
  },
  routeType: string
  status: string
  lat: number
  lon: number
}

export type LineGroup = {
  '$type': string
  naptanIdReference: string
  stationAtcoCode: string
  lineIdentifier: string[]
}

export type LineModeGroup = {
  '$type': string
  modeName: StopPointMode
  lineIdentifier: string[]
}

export type FilteredStopPoints = {
  trainStops: StopPoint[],
  busStops: StopPoint[],
  tramStops: StopPoint[],
  metroStops: StopPoint[]
}
