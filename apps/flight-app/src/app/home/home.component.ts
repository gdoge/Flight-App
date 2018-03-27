import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {


  destroy$: Subject<boolean> = new Subject<boolean>();
  subscription$: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];

    let numbers = Observable.of(1,2,3);
    numbers.subscribe(
      data => {
        console.log(data);
      }
    )

    let timer = Observable.timer(1000, 1000)
    .takeUntil(this.destroy$)
    this.subscription$ = timer.subscribe(
      data => {
        console.log(data)
      }
    )
  }

  destroyObs(){
    this.destroy$.next(true);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe;
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!'
  }

  logout(): void {
    this._userName = '';
  }


}
