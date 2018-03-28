import { Flight } from '@flight-workspace/flight-api/src/models/flight';
export interface FlightBooking {
  flights: Flight[]
}

export interface FlightBookingState {
  readonly flightBooking: FlightBooking;
}
