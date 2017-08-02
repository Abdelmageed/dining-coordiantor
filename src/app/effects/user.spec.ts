import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { UserEffects } from './user';
import { UserService } from "../services/user.service";
import * as user from '../actions/user';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

// import 'rx/js/add/operator/next';

export class TestActions extends Actions {
    constructor() {
        super(empty()); 
    }
    set stream(source: Observable<any>) {
        this.source = source;
    }
}

describe('User Effects', () => {
    let effects: UserEffects;
    let actions$: TestActions;
    let userService;
    
    function getActions () {
        return new TestActions();
    }


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                // provideMockActions(() => actions),
                {provide: UserService, useValue: jasmine.createSpyObj('userService', [
                    'setSearchQuery',
                    'logout',
                    'login'
                ])},
                {provide: Actions, useFactory: getActions }
            ]
        });

        effects = TestBed.get(UserEffects);
        userService = TestBed.get(UserService);
        actions$ = TestBed.get(Actions);
    });

    it('should dispatch SetSearchQueryAction with the query from dispatched SetSearchQueryRequestAction', () => {
        const query = 'test query';
        const response = cold('-r|', {r: query});

        userService.setSearchQuery.and.returnValue(response);
        actions$.stream = hot('-a', {a: new user.SetSearchQueryRequestAction(query)});

        const expected = cold('--b', {b: new user.SetSearchQueryAction(query)});


        expect(effects.setSearchQuery$).toBeObservable(expected);
    });

    
});
