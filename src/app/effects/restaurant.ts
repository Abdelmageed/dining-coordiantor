import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as restaurant from '../actions/restaurant';

import { RestaurantService } from '../services/restaurant.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantEffects {
    constructor(
        private restaurantService: RestaurantService,
        private actions$: Actions
    ) {}

    @Effect() restaurants$: Observable<Action> = this.actions$
        .ofType(restaurant.SEARCH)
        .map(toPayload)
        .switchMap(location => this.restaurantService.getRestaurants(location))
        .map(restaurants => new restaurant.SearchCompleteAction(restaurants))
        .catch(err => of(new restaurant.SearchCompleteAction([])));

    @Effect() addGoing$: Observable<Action> = this.actions$
        .ofType(restaurant.ADD_GOING_REQUEST)
        .map(toPayload)
        .switchMap(restaurantId => this.restaurantService.addGoing(restaurantId))
        .map(data => new restaurant.AddGoingAction({
            userId: data.userId, restaurantId: data.restaurantId
        }));

    @Effect() removeGoing$: Observable<Action> = this.actions$
        .ofType(restaurant.REMOVE_GOING_REQUEST)
        .map(toPayload)
        .switchMap(restaurantId => this.restaurantService.removeGoing(restaurantId))
        .map(data => new restaurant.RemoveGoingAction({
            userId: data.userId, restaurantId: data.restaurantId
        }));
}