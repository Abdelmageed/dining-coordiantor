import * as search from '../actions/search';

export interface State {
    query: string;
};

export const initialState = {
    query: ''
};

export function reducer (state = initialState, action: search.Actions): State {

    switch (action.type) {

        case search.SET_SEARCH_QUERY:
            return {...state, query: action.payload};

        case search.CLEAR_SEARCH_QUERY:
            return initialState;

        default:
            return state;
    }
}

export const getQuery = (state: State) => state.query;