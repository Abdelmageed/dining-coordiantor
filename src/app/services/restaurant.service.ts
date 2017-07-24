import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Http } from "@angular/http";
import { Store } from "@ngrx/store";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from '../models/restaurant';
import * as fromRoot from '../reducers/index';

@Injectable()
export class RestaurantService {

  restaurants: {[id: number]: Restaurant};
  userId: number;

  constructor(
    private http: Http,
    private _store: Store<fromRoot.State>
  ) { 
    this._store.select(fromRoot.getRestaurantEntities).subscribe(
      restaurants => this.restaurants = restaurants
    )
    this._store.select(fromRoot.getUserId).subscribe(id => this.userId = id);
  }

  getRestaurants(location: string): Observable<Restaurant[]> {

      return this.http.get(`/api/restaurants/?location=${location}`)
        .map(res => res.json().data as Restaurant[])
        .catch((error) => {console.log(error); return [];});
  }

  
  isLoggedInUserGoing (restaurantId: number): boolean{
    if(this.userId == null) {return false;}

    return (this.restaurants[restaurantId].going.findIndex(id => id == this.userId)) !== -1;
      
  }

  addGoing (restaurantId: number): Observable<{userId: number, restaurantId: number}>{
    const restaurant = this.restaurants[restaurantId];
    const newRestaurant = Object.assign({}, restaurant, {going: restaurant.going.concat(this.userId)});
    
    
    return this.http.put(`/api/restaurants/${restaurantId}`, newRestaurant)
      .map(() => ({userId: this.userId, restaurantId}))
      .catch((error) => {console.log(error); return of({userId: this.userId, restaurantId})});
  }

   removeGoing (restaurantId: number): Observable<{userId: number, restaurantId: number}>{
    const restaurant = this.restaurants[restaurantId];
    const newRestaurant = Object.assign({}, restaurant, {
      going: restaurant.going.filter(id => id != this.userId)
    });
    
    return this.http.put(`/api/restaurants/${restaurantId}`, newRestaurant)
      .map(() => ({userId: this.userId, restaurantId}))
      .catch((error) => {console.log(error); return of({userId: this.userId, restaurantId})});
  }

}
