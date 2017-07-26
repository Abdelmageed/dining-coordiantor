import * as user from '../actions/user';

export interface State {
    token: string;
    id: number;
    name: string;
    loginError: string;
}

export const initialState: State = {
    token: '',
    name: '',
    id: 0,
    loginError: ''
};

export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {

        case user.LOGIN_REQUEST:
            return {...state, loginError: ''};

        case user.LOGIN_SUCCESS:
            return {...state, ...action.payload};

        case user.LOGIN_ERROR:
            return {...state, loginError: action.payload}

        case user.LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export const getId = (state: State) => state.id;
export const getName = (state: State) => state.name;
export const getToken = (state: State) => state.token;
export const getLoginError = (state: State) => state.loginError;