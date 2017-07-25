import { RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection} from '@angular/http/testing';
import { db } from './in-memory-db';
import { Injectable } from "@angular/core";

@Injectable()
export class MockBackendService {


    routes: {[name: string]: {regex: RegExp, method: RequestMethod}} = {
        'getRestaurantsByLocation': {
            regex: /api\/restaurants\/\?location/i,
            method: RequestMethod.Get
        },
        'updateRestaurant': {
            regex: /api\/restaurants\/[0-9]+/i,
            method: RequestMethod.Put
        },
        'login': {
            regex: /api\/users\/login/i,
            method: RequestMethod.Post
        },
        'logout': {
            regex: /api\/users\/logout/i,
            method: RequestMethod.Get
        }
    }

    constructor (private backend: MockBackend) {

        this.backend.connections
            .subscribe( (c: MockConnection) => {
               
                if (c.request.url.match( this.routes['getRestaurantsByLocation'].regex) && c.request.method === this.routes['getRestaurantsByLocation'].method) {

                    //get restaurants by location
                    const searchLocation = c.request.url.split('location=')[1];
                    const location = searchLocation === 'null' ? '' : searchLocation;
                    const fetchedRestaurants = db.restaurants.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));
                    c.mockRespond(new Response(new ResponseOptions({
                        body: {restaurants: fetchedRestaurants}
                    })));

                } else if (c.request.url.match( this.routes['updateRestaurant'].regex) && c.request.method === this.routes['updateRestaurant'].method) {

                    const restaurantId = parseInt(c.request.url.split('/')[3]);
                    const newRestaurant = c.request.getBody();

                    db.restaurants = db.restaurants.map(r => {
                        if (r.id === restaurantId) {
                            return newRestaurant
                        }
                        return r;
                    });

                    c.mockRespond(new Response(new ResponseOptions({status: 204})));

                } else if (c.request.url.match( this.routes['login'].regex) && c.request.method === this.routes['login'].method) {

                    const body = JSON.parse(c.request.getBody());
                    const email = body.email, password = body.password;
                    const user = db.users.find(u => u.email === email && u.password === password);

                    if (user) {
                        user.token = 'auth token';
                        c.mockRespond(new Response(new ResponseOptions({body: {data: user}})))
                    } else {
                        c.mockRespond(new Response(new ResponseOptions({status: 401, body: {error: 'Invalid email or password'}})))
                    }

                } else if (c.request.url.match( this.routes['logout'].regex) && c.request.method === this.routes['logout'].method) {

                    const authToken = c.request.headers.get('Authorization');
                    const user = db.users.find(u => u.token == authToken);

                    if(user) {
                        user.token = '';
                        c.mockRespond(new Response(new ResponseOptions({status: 200, statusText: 'success'})))
                    } else {
                        c.mockRespond(new Response(new ResponseOptions({status: 401, statusText: 'Unauthorized'})));
                    }
                }
            })
    }
}