import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import {FlightBookingState} from './flight-booking.interfaces';
import { flightBookingActionTypes, flightLoadingAction, FlightsLoadedAction } from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';
import { filter, switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {
  // @Effect() loadData = this.flightService.fetch(flightBookingActionTypes.FLIGHTS_LOAD, {
  //   run: (action: flightLoadingAction, state: FlightBookingState) => {
  //     return {
  //       type: flightBookingActionTypes.FLIGHTS_LOAD,
  //       payload: {}
  //     };
  //   },

  //   onError: (action: flightLoadingAction, error) => {
  //     console.error('Error', error);
  //   }
  // });

  constructor(private actions$: Actions, private flightService: FlightService) {}


  @Effect()
  flightLoad = this.actions$.pipe(
    filter(a => a instanceof flightLoadingAction),
    switchMap((a: flightLoadingAction) => this.flightService.find(a.from, a.to, a.urgent) ),
    map(flights => new FlightsLoadedAction(flights))
  )

}
