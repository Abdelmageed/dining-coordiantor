import { Component } from '@angular/core';
import { Restaurant } from "./models/restaurant";
import { Observable } from "rxjs/observable";
import { Store } from "@ngrx/store";
import { SearchAction } from './actions/restaurant';
import * as fromRoot from './reducers/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  restaurants: Observable<Restaurant[]>;
  constructor (
    private _store: Store<fromRoot.State>
  ) {
    
    //only need newest values
    this.restaurants = this._store.select(fromRoot.getAllRestaurants);
    // this.restaurants.subscribe(rest => console.log(rest));
  }

  search (location: string) {
    this._store.dispatch(new SearchAction(location));
  }

}
