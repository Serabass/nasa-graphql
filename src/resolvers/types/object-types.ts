import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class AuthPayload {
    @Field()
    public token: string;
    public expiresIn?: number;
}

@ObjectType()
export class SWAPIFilmResponse {
    @Field()
    public title: string;
}
