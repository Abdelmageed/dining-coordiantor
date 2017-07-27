import { createSelector } from 'reselect';

import * as restaurant from '../actions/restaurant';
import { Restaurant } from "../models/restaurant";

export interface State {
    entities: {[id: number]: Restaurant},
    ids: string[],
}

export const initialState: State = {
    entities: {},
    ids: []
}

export function reducer(state = initialState, action: restaurant.Actions): State {

    switch (action.type) {

        case restaurant.SEARCH_COMPLETE: {

            const restaurants = action.payload;
            const newRestaurantIds = restaurants.map(r => r.id);
            const newRestaurantEntities = {};
            restaurants.forEach(r => newRestaurantEntities[r.id] = r);

            return Object.assign({}, state, {
                entities: newRestaurantEntities,
            }, {
                ids: newRestaurantIds
            })
        }

        case restaurant.ADD_GOING: {
            const rest = state.entities[action.payload.restaurantId];
            if(!rest) {return state;}

            const newRest = Object.assign({}, rest, {
                going: rest.going.concat(action.payload.userId)
            });
            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {
                    [action.payload.restaurantId]: newRest})
            });
        }

        case restaurant.REMOVE_GOING: {
            const rest = state.entities[action.payload.restaurantId];
            if(!rest) {return state;}

            const newRest = Object.assign({}, rest, {
                going: rest.going.filter(id => id != action.payload.userId)
            });
            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {
                    [action.payload.restaurantId]: newRest})
            });
        }

        case restaurant.CLEAR_RESTAURANTS: {
            return initialState;
        }
            
        default:
            return state;
    }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});