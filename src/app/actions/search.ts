import { Action } from '@ngrx/store';

export const SET_SEARCH_QUERY = '[Search] SET_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = '[Search] CLEAR_SEARCH_QUERY';

export class SetSearhQueryAction implements Action {
    readonly type = SET_SEARCH_QUERY;

    constructor(public payload: string) {}
}

export class ClearSearchQueryAction implements Action {
    readonly type = CLEAR_SEARCH_QUERY;

    constructor() {}
}

export type Actions = SetSearhQueryAction
                    | ClearSearchQueryAction;