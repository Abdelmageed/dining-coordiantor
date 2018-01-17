import { prop, arrayProp, Typegoose } from 'typegoose';

// export class User extends Typegoose {
    export class User {

    @prop({ required: true })
    id: number;

    @prop()
    name: string;

    @prop({ required: true })
    email: string;

    @prop()
    password: string;

    @prop()
    token: string;

    @prop()
    searchQuery: string;
}