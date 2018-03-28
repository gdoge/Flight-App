import { Flight } from '@flight-workspace/flight-api/src/models/flight';
export enum flightBookingActionTypes {
  FLIGHT_UPDATE = '[flight-booking] update',
  FLIGHTS_LOAD = '[flight-booking] loading',
  FLIGHTS_LOADED = '[flight-booking] loaded',
}

export class FlightUpdateAction {
  readonly type = flightBookingActionTypes.FLIGHT_UPDATE;
  constructor(readonly flight: Flight) {
  }
}

export class flightLoadingAction {
  readonly type= flightBookingActionTypes.FLIGHTS_LOAD;
  constructor(readonly from: string, readonly to: string, readonly urgent: boolean) {
  }
}

export class FlightsLoadedAction  {
  readonly type= flightBookingActionTypes.FLIGHTS_LOADED;
  constructor(readonly flights: Flight[]) {
  }
}

export type FlightBookingAction = FlightsLoadedAction  | flightLoadingAction | FlightUpdateAction;

