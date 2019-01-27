import {InputType, Field, ObjectType} from 'type-graphql';
import {CartItem} from "../../entities/CartItem";

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;
    expires_in?: number;
}

@InputType()
export class PaginationArgs {
    @Field() firstName: string;
    @Field() lastName: string;
    @Field() password: string;
    @Field() email: string;
}

@InputType()
export class CartItemArgs {
    @Field() productId: number;
    @Field() count: number;
}

@InputType()
export class CartArgs {
    @Field(type => [CartItemArgs]) items: CartItemArgs[];
}

@InputType()
export class SignUpArgs {
    @Field() firstName: string;
    @Field() lastName: string;
    @Field() password: string;
    @Field() email: string;
}

@InputType()
export class SignInArgs {
    @Field() email: string;
    @Field() password: string;
}

export interface AuthTokenPayload {
    id: number;
    email: string;
}
