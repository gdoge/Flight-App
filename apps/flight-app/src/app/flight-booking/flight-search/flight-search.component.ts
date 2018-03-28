import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { EventService } from '../../event.service';
import { Flight } from '@flight-workspace/flight-api/src/models/flight';
import { Store } from '@ngrx/store';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import { Observable } from 'rxjs/Observable';
import { FlightsLoadedAction, FlightUpdateAction, flightLoadingAction } from '../+state/flight-booking.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$: (Observable<Flight[]>)

  constructor(
    private flightService: FlightService,
    private eventService: EventService,
    private store: Store<FlightBookingState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.select(s => s.flightBooking.flights);
  }

  search(): void {
    if (!this.from || !this.to) return;
    //new
    this.store.dispatch(new flightLoadingAction(this.from, this.to, this.urgent))


    //old
    // this.flightService.find(this.from, this.to, this.urgent).subscribe(
    //   s => this.store.dispatch(new FlightsLoadedAction (s))
    // )
  }

  delay(): void {

    this.flights$.pipe(take(1)).subscribe(flights => {
      let flight = flights[0];
  
      let oldDate = new Date(flight.date);
      let newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      let newFlight = { ...flight, date: newDate.toISOString() };
      
      this.store.dispatch(new FlightUpdateAction(newFlight));
    });
  }

  select(f:Flight, selected: boolean){
    if(selected){
      this.eventService.publishFlight(f);
    }else{
      this.eventService.removeFlight(f);
    }
    this.basket[f.id] = selected;

  }
}
