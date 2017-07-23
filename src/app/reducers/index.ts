import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromRestaurant from './restaurant';

export interface State {
    restaurant: fromRestaurant.State
}


export const reducers = {
    restaurant: fromRestaurant.reducer
};

export const initialState = {
    restaurant: fromRestaurant.initialState
};



//selectors

export const getRestaurantState = (state: State) => state.restaurant;


export const getRestaurantEntities = createSelector(getRestaurantState, fromRestaurant.getEntities);
export const getRestaurantIds = createSelector(getRestaurantState, fromRestaurant.getIds);
export const getAllRestaurants = createSelector(getRestaurantState, fromRestaurant.getAll);

