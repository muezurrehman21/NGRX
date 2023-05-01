import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter/state/counter.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {

  counter : number | undefined;
  counterSubscription : Subscription | undefined;
  
  //we can use following instead of using subscriptiom.
  counter$ !: Observable<{ counter : number }>;

  constructor(private store: Store<{ counter: CounterState }>){

  }

  ngOnInit(): void {
    this.counterSubscription = this.store.select('counter').subscribe(date=>{
      this.counter = date.counter;
    });

    this.counter$ = this.store.select('counter');
  }

  ngOnDestroy(): void {
    this.counterSubscription?.unsubscribe();
  }


}
