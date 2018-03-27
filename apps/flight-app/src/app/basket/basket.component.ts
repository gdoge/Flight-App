import { Component, OnDestroy } from '@angular/core';
import { Flight } from '@flight-workspace/flight-api';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators';
import { EventService } from '../event.service';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy{
  onDestroy$ = new Subject<void>();
  flights:Flight[] = [];
  constructor(private eventService:EventService) {
  }
  
  ngOnInit(): void {
    this.eventService.flightSelected$.takeUntil(this.onDestroy$).subscribe(f => {
    if (!f) return;

    if(f.delete){
      let index = this.flights.indexOf(f.flight);
      this.flights.splice(index, 1);
    }else{

      this.flights.unshift(f.flight);
      if (this.flights.length > 3) {
          this.flights.pop();
      }
    }

    })
}


  ngOnDestroy(): void {
    this.onDestroy$.next();
  }



}
