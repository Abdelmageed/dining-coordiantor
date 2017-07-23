import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Restaurant } from '../models/restaurant';

import { Http } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantService {

  constructor(private http: Http) { }

  getRestaurants(location: string): Observable<Restaurant[]> {

      return this.http.get(`/api/restaurants/?location=${location}`)
        .map(res => res.json().data as Restaurant[])
        .catch((error) => {console.log(error); return [];});
  }

}
