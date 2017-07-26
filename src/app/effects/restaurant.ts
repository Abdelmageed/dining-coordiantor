import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import * as restaurant from '../actions/restaurant';
import * as user from '../actions/user';
import * as fromRoot from '../reducers/index';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from "../services/user.service";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';

@Injectable()
export class RestaurantEffects {
    constructor(
        private restaurantService: RestaurantService,
        private userService: UserService,
        private actions$: Actions,
        private _store: Store<fromRoot.State>
    ) {}

    @Effect() search$: Observable<Action> = this.actions$
        .ofType(restaurant.SEARCH)
        .map(toPayload)
        .concatMap(location => forkJoin(of(new user.SetSearchQueryRequestAction(location)), this.restaurantService.getRestaurants(location)))
        .map((res) => {
            this._store.next(res[0]);
            return new restaurant.SearchCompleteAction(res[1])
        })
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