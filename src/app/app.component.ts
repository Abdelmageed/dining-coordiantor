import { Component } from '@angular/core';
import { Restaurant } from "./models/restaurant";
import { Observable } from "rxjs/observable";
import { Store } from "@ngrx/store";
import { SearchAction } from './actions/restaurant';
import * as fromRoot from './reducers/index';
import { FormGroup, FormControl } from "@angular/forms";

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
    this.restaurants = this._store.select(fromRoot.getAllRestaurants);
  }



}
