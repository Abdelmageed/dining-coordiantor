import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as user from '../actions/user';
import * as restaurant from '../actions/restaurant';
import * as search from '../actions/search';
import * as fromRoot from '../reducers/index';

import { UserService } from '../services/user.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { User } from "../models/user";


@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private userService: UserService) {}

    @Effect() login$: Observable<Action> = this.actions$
        .ofType(user.LOGIN_REQUEST)
        .map(toPayload)
        .switchMap(credentials => this.userService.login(credentials.email, credentials.password))
        .mergeMap(r => {
            const err = r.error, data = r.data;
            let actions: Action[] = [];
            if (err) {
                actions.push(new user.LoginErrorAction(err));
            }
            if(data) {
                const u = data;
                actions = actions.concat([
                    new user.LoginSuccessAction({
                        name: u.name,
                        token: u.token,
                        id: u.id,
                        searchQuery: u.searchQuery
                    }),
                    new search.SetSearhQueryAction(u.searchQuery),
                    new restaurant.SearchAction(u.searchQuery
                    )
                ]);
            }
            return actions;
            
        });

    @Effect() logout$: Observable<Action> = this.actions$
        .ofType(user.LOGOUT_REQUEST)
        .map(toPayload)
        .switchMap(token => this.userService.logout(token))
        .mergeMap(r => [
            new user.LogoutSuccessAction(),
            new restaurant.ClearRestaurantsAction(),
            new search.ClearSearchQueryAction()
        ]);

    @Effect() setSearchQuery$: Observable<Action> = this.actions$
        .ofType(user.SET_SEARCH_QUERY_REQUEST)
        .map(toPayload)
        .switchMap(query => this.userService.setSearchQuery(query))
        .map(query => new user.SetSearchQueryAction(query));
        
}