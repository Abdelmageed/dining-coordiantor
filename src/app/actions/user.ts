import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const LOGIN_REQUEST = '[User] LOGIN_REQUEST';
export const LOGIN_SUCCESS = '[User] LOGIN_SUCCESS';
export const LOGIN_ERROR = '[User] LOGIN_ERROR';
export const LOGOUT_REQUEST = '[User] LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '[User] LOGOUT_SUCCESS';
export const LOGOUT_ERROR = '[User] LOGOUT_ERROR';
export const SET_SEARCH_QUERY_REQUEST = '[User] SET_SEARCH_QUERY_REQUEST';
export const SET_SEARCH_QUERY = '[User] SET_SEARCH_QUERY';


export class LoginRequestAction implements Action {
    readonly type = LOGIN_REQUEST;

    constructor(public payload: {email: string, password: string}) {}
}


export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: {name: string, token: string, id: number, searchQuery: string}) {}
}


export class LoginErrorAction implements Action {
    readonly type = LOGIN_ERROR;

    constructor(public payload: string) {}
}


export class LogoutRequestAction implements Action {
    readonly type = LOGOUT_REQUEST;

    constructor(public payload: string) {}
}

export class LogoutSuccessAction implements Action {
    readonly type = LOGOUT_SUCCESS;

    constructor() {}
}


export class LogoutErrorAction implements Action {
    readonly type = LOGOUT_ERROR;

    constructor() {}
}

export class SetSearchQueryRequestAction implements Action {
    readonly type = SET_SEARCH_QUERY_REQUEST;

    constructor(public payload: string) {}
}

export class SetSearchQueryAction implements Action {
    readonly type = SET_SEARCH_QUERY;

    constructor(public payload: string) {}
}

export type Actions = LoginRequestAction
                    | LoginSuccessAction
                    | LoginErrorAction
                    | LogoutRequestAction
                    | LogoutSuccessAction
                    | LogoutErrorAction
                    | SetSearchQueryAction;