import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromRestaurant from './restaurant';
import * as fromUser from './user';

export interface State {
    restaurant: fromRestaurant.State,
    user: fromUser.State,
}


export const reducers = {
    restaurant: fromRestaurant.reducer,
    user: fromUser.reducer,
};

export const initialState = {
    restaurant: fromRestaurant.initialState,
    user: fromUser.initialState,
};



//selectors

export const getRestaurantState = (state: State) => state.restaurant;
export const getRestaurantEntities = createSelector(getRestaurantState, fromRestaurant.getEntities);
export const getRestaurantIds = createSelector(getRestaurantState, fromRestaurant.getIds);
export const getAllRestaurants = createSelector(getRestaurantState, fromRestaurant.getAll);


export const getUserState = (state: State) => state.user;
export const getUserId = createSelector(getUserState, fromUser.getId);