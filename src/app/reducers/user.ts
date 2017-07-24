

export interface State {
    token: string;
    id: number;
    name: string;
    email: string;
}

export const initialState: State = {
    token: '',
    name: 'Abdelmageed',
    email: 'me@nowhere.com',
    id: 0
};

export function reducer(state = initialState, action: any): State {
    switch (action.type) {

        default:
            return state;
    }
}

export const getId = (state: State) => state.id;