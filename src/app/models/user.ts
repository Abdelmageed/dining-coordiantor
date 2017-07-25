export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string;
}

export const users: User[] = [
    {
        id: 0,
        name: 'Abdelmageed',
        email: 'mgd@sm.com',
        password: 'Welcome123',
        token: ''
    }
];