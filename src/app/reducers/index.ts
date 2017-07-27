import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromRestaurant from './restaurant';
import * as fromUser from './user';
import * as fromSearch from './search';

export interface State {
    restaurant: fromRestaurant.State,
    user: fromUser.State,
    search: fromSearch.State
}


export const reducers = {
    restaurant: fromRestaurant.reducer,
    user: fromUser.reducer,
    search: fromSearch.reducer,
};

export const initialState = {
    restaurant: fromRestaurant.initialState,
    user: fromUser.initialState,
    search: fromSearch.initialState,
};



//selectors

export const getRestaurantState = (state: State) => state.restaurant;
export const getRestaurantEntities = createSelector(getRestaurantState, fromRestaurant.getEntities);
export const getRestaurantIds = createSelector(getRestaurantState, fromRestaurant.getIds);
export const getAllRestaurants = createSelector(getRestaurantState, fromRestaurant.getAll);


export const getUserState = (state: State) => state.user;
export const getUserId = createSelector(getUserState, fromUser.getId);
export const getUserName = createSelector(getUserState, fromUser.getName);
export const getUserToken = createSelector(getUserState, fromUser.getToken);
export const getLoginError = createSelector(getUserState, fromUser.getLoginError);
export const getUserSearchQuery = createSelector(getUserState, fromUser.getSearchQuery);

export const getSearchState = (state: State) => state.search;
export const getCurrentSearchQuery = createSelector(getSearchState, fromSearch.getQuery);