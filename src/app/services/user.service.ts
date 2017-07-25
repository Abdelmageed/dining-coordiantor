import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/observable";
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    constructor (private http: Http) {
        
    }

    login(email: string, password: string): Observable<{[data: string]: User} | {[error: string]: string}> {
        
        return this.http.post('api/users/login', {email, password})
            .map(r => {
                console.log(r.json());
               return r.json();
            })
            .catch(err => {console.log(err); return of('Server error please try again later')});

    }

    logout(authToken: string): Observable<any> {

        return this.http.get('api/users/logout', {headers: new Headers({'Authorization': authToken})}).map(r => r)
        .catch(err => of('Server error please try again later'));
        
    }
}