import { Observable } from "rxjs/observable";
import { Store } from "@ngrx/store";
import { Component, OnInit } from '@angular/core';

import { Restaurant } from "../../models/restaurant";
import * as fromRoot from '../../reducers/index';
import * as restaurant from '../../actions/restaurant';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Observable<Restaurant[]>;
  isUserAuthenticated: boolean;

  constructor(private _store: Store<fromRoot.State>, private userService: UserService) { 
      this.restaurants = this._store.select(fromRoot.getAllRestaurants);
      this._store.select(fromRoot.getUserToken)
        .switchMap(token => this.userService.isUserAuthenticated(token))
        .subscribe(isAuthenticated => this.isUserAuthenticated = isAuthenticated);
  }

  addGoing(restaurantId) {
    if (!this.isUserAuthenticated) { return; }
    this._store.dispatch(new restaurant.AddGoingRequestAction(restaurantId));
  }

  removeGoing(restaurantId) {
    if (!this.isUserAuthenticated) { return; }    
    this._store.dispatch(new restaurant.RemoveGoingRequestAction(restaurantId));
  }

  ngOnInit() {
    
  }

}
