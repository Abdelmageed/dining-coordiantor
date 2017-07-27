import { Action } from '@ngrx/store';
import { Restaurant } from '../models/restaurant';

export const SEARCH = '[Restaurant] SEARCH';
export const SEARCH_COMPLETE = '[Restauarnt] SEARCH_COMPLETE';
export const ADD_GOING_REQUEST ='[Restaurant] ADD_GOING_REQUEST';
export const ADD_GOING = '[Restaurant] ADD_GOING';
export const REMOVE_GOING_REQUEST = '[Restaurant] REMOVE_GOING_REQUEST';
export const REMOVE_GOING = '[Restaurant] REMOVE_GOING';
export const CLEAR_RESTAURANTS = '[Restaurant] CLEAR_RESTAURANTS';

export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
    readonly type = SEARCH_COMPLETE;

    constructor(public payload: Restaurant[]) {}
}

export class AddGoingRequestAction implements Action {
    readonly type = ADD_GOING_REQUEST;

    constructor(public payload: number) {}
}

export class AddGoingAction implements Action {
    readonly type = ADD_GOING;

    constructor(public payload: {restaurantId: number, userId: number}) {}
}

export class RemoveGoingRequestAction implements Action {
    readonly type = REMOVE_GOING_REQUEST;

    constructor(public payload: number) {}
}

export class RemoveGoingAction implements Action {
    readonly type = REMOVE_GOING;

    constructor(public payload: {restaurantId: number, userId: number}) {}
}

export class ClearRestaurantsAction implements Action {
    readonly type = CLEAR_RESTAURANTS;

    constructor() {}
}


export type Actions = SearchAction
                    | SearchCompleteAction
                    | AddGoingRequestAction
                    | AddGoingAction
                    | RemoveGoingAction
                    | ClearRestaurantsAction;