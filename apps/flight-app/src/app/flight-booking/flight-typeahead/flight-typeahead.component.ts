import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators/tap';
import { Flight } from '@flight-workspace/flight-api';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl()
  flights$: Observable<Flight[]>
  loading: boolean

  constructor(private http:HttpClient) { }

  

  ngOnInit() {
    this.control = new FormControl();

    this.flights$ = 
        this.control
            .valueChanges
            .pipe(
                debounceTime(300),
                tap(input => this.loading = true),
                switchMap(input => this.load(input)),
                tap(v => this.loading = false)
            );
}

load(from: string):Observable<Flight[]>  {
  let url = "http://www.angular.at/api/flight";

  let params = new HttpParams()
                      .set('from', from);

  let headers = new HttpHeaders()
                      .set('Accept', 'application/json');

  return this.http.get<Flight[]>(url, {params, headers});

};

}
