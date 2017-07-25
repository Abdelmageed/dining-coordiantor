import { Restaurant } from "../models/restaurant";
import { User } from "../models/user";

const restaurants: Restaurant[] = [
            {
                id: 0,
                name: 'Big Burgers',
                location: 'Cairo',
                going: []
            },
            {
                id: 1,                
                name: 'Bigger Burgers',
                location: 'Cairo',
                going: []
            },
            {
                id: 2,                
                name: 'Big Burgers Alex.',
                location: 'Alexandria',
                going: []
            },
            {
                id: 3,
                name: 'Hot Chillis',
                location: 'Cairo',
                going: [0]
            },
            {
                id: 4,
                name: 'Icy Cocktails',
                location: 'Alexandria',
                going: [0, 1, 2]
            }
];

const users: User[] = [
    {
        id: 0,
        name: 'Abdelmageed',
        email: 'mgd@sm.com',
        password: 'Welcome123',
        token: ''
    }
];

export const db = {
    restaurants,
    users
}