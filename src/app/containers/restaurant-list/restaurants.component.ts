import { Observable } from "rxjs/observable";
import { Store } from "@ngrx/store";
import { Component, OnInit } from '@angular/core';

import { Restaurant } from "../../models/restaurant";
import * as fromRoot from '../../reducers/index';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Observable<Restaurant[]>;

  constructor(private _store: Store<fromRoot.State>) { 
        this.restaurants = this._store.select(fromRoot.getAllRestaurants);
  }

  ngOnInit() {
    
  }

}
