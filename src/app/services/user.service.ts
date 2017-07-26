import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/observable";
import { of } from 'rxjs/observable/of';
import { Store } from "@ngrx/store";

import 'rxjs/add/operator/catch';

import * as fromRoot from '../reducers/index';

@Injectable()
export class UserService {

    id: number;
    token: string;
    constructor (private http: Http, private _store: Store<fromRoot.State>) {
        _store.select(fromRoot.getUserId)
            .subscribe(id => this.id = id);
        _store.select(fromRoot.getUserToken)
            .subscribe(token => this.token = token);
    }

    login(email: string, password: string): Observable<{[data: string]: User} | {[error: string]: string}> {
        return this.http.post('api/users/login', {email, password})
            .map(r =>  {console.log(r.json()); return r.json()})
            .catch(err => of('Server error please try again later'));

    }

    logout(authToken: string): Observable<any> {

        return this.http.get('api/users/logout', {headers: new Headers({'Authorization': authToken})}).map(r => r)
        .catch(err => of('Server error please try again later'));
        
    }

    isUserAuthenticated(authToken: string): Observable<boolean> {
        if(authToken == '') {return of(false);}

        return this.http.post('api/users/user-authenticated', {body: authToken})
            .map(r => (r.json()));
    }

    setSearchQuery(searchQuery: string) {

        return this.http.put(`api/users/${this.id}`, {body: {searchQuery}})
            .map(() => searchQuery);
            
    }
}