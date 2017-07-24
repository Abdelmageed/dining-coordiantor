import { Observable } from "rxjs/observable";
import { Store } from "@ngrx/store";
import { Component, OnInit } from '@angular/core';

import { Restaurant } from "../../models/restaurant";
import * as fromRoot from '../../reducers/index';
import * as restaurant from '../../actions/restaurant';

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

  addGoing(restaurantId) {
    this._store.dispatch(new restaurant.AddGoingRequestAction(restaurantId));
  }

  removeGoing(restaurantId) {
    this._store.dispatch(new restaurant.RemoveGoingRequestAction(restaurantId));
  }

  ngOnInit() {
    
  }

}
