import { prop, arrayProp, Typegoose } from 'typegoose';

// export class  Restaurant extends Typegoose {
export class  Restaurant {    
    @prop({ required: true })
    id: number;

    @prop()
    name: string;

    @prop()
    location: string;

    @arrayProp({items: Number})
    going: number[];
}
