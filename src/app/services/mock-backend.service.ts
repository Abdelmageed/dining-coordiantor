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

                } else if (c.request.url.match( this.routes['logout'].regex) && c.request.method === this.routes['logout'].method) {

                }
            })
    }
}