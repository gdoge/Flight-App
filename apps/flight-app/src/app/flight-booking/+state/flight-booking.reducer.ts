import {FlightBooking} from './flight-booking.interfaces';
import {FlightBookingAction, flightBookingActionTypes} from './flight-booking.actions';

export function flightBookingReducer(state: FlightBooking, action: FlightBookingAction): FlightBooking {
  switch (action.type) {
    case flightBookingActionTypes.FLIGHTS_LOADED: {
      return { flights: action.flights };
    }
    case flightBookingActionTypes.FLIGHT_UPDATE: {
      let oldFlights = state.flights;
      let index = oldFlights.findIndex(f => f.id == action.flight.id)
      let newFlights = [
        ...state.flights.slice(0, index),
        action.flight,
        ...state.flights.slice(index+1)
      ]
      return { flights: newFlights};
    }
    default: {
      return state;
    }
  }
}
