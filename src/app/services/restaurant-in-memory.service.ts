import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Restaurant } from "../models/restaurant";

export class RestaurantInMemoryService implements InMemoryDbService {

    createDb () {
        let restaurants: Restaurant[] = [
            {
                id: 0,
                name: 'Big Burgers',
                location: 'Cairo',
                goingCount: 0
            },
            {
                id: 1,                
                name: 'Bigger Burgers',
                location: 'Cairo',
                goingCount: 0
            },
            {
                id: 2,                
                name: 'Big Burgers Alex.',
                location: 'Alexandria',
                goingCount: 0
            },
            {
                id: 3,
                name: 'Hot Chillis',
                location: 'Cairo',
                goingCount: 1
            },
            {
                id: 4,
                name: 'Icy Cocktails',
                location: 'Alexandria',
                goingCount: 3
            }
        ];

    return {restaurants};
    }
}