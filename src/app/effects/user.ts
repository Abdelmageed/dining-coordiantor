import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as user from '../actions/user';

import { UserService } from '../services/user.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { User } from "../models/user";


@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private userService: UserService) {}

    @Effect() login$: Observable<Action> = this.actions$
        .ofType(user.LOGIN_REQUEST)
        .map(toPayload)
        .switchMap(credentials => this.userService.login(credentials.email, credentials.password))
        .map((r) => {
            if(r.data) {
                const u = r.data as User;
                return new user.LoginSuccessAction({
                    name: u.name,
                    token: u.token,
                    id: u.id
                });
            }
            return new user.LoginErrorAction(r.error as string);
        });

    @Effect() logout$: Observable<Action> = this.actions$
        .ofType(user.LOGOUT_REQUEST)
        .map(toPayload)
        .switchMap(token => this.userService.logout(token))
        .map(r => new user.LogoutSuccessAction());
        
}