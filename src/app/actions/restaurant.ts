import { Action } from '@ngrx/store';
import { Restaurant } from '../models/restaurant';

export const SEARCH = '[Restaurant] SEARCH';
export const SEARCH_COMPLETE = '[Restauarnt] SEARCH_COMPLETE';

export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
    readonly type = SEARCH_COMPLETE;

    constructor(public payload: Restaurant[]) {}
}

export type Actions = SearchAction
                    | SearchCompleteAction;