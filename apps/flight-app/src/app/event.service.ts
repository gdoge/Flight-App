import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Flight } from '@flight-workspace/flight-api';

@Injectable()
export class EventService {

  private flightSelectedSubject = new ReplaySubject<{flight:Flight, delete:boolean}>(3);
  readonly flightSelected$ : Observable<{flight:Flight, delete:boolean}> = this.flightSelectedSubject.asObservable();

  constructor() { }

  publishFlight (flight:Flight) {

    this.flightSelectedSubject.next({flight, delete:false});
  }


  removeFlight (flight:Flight) {

    this.flightSelectedSubject.next({flight, delete:true});
  }


}
