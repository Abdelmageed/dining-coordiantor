import { Action } from '@ngrx/store';

import { reducer } from './search';
import * as fromSearch from './search';
import * as search from '../actions/search';


describe('Search Reducer', () => {

    it('should return the initial state for an undefined action type', () => {
        const action: any = {type: undefined};
        const expectedState = fromSearch.initialState;
        const state = reducer(undefined, action);
        
        expect(state).toEqual(expectedState);
    });

    it('should set the search query', () => {
        const query = 'test query';
        const action = new search.SetSearhQueryAction(query);
        const initial = {query: ''};
        const expected = {query};

        const state = reducer(initial, action);

        expect(state).toEqual(expected);
    });

    it('should clear the search query', () => {
        const action = new search.ClearSearchQueryAction();
        const initial = {query: 'some old query'};
        const expected = {query: ''};

        const state = reducer(initial, action);

        expect(state).toEqual(expected);
    });
})