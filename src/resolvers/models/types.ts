import {InputType, Field, ObjectType} from 'type-graphql';

@ObjectType()
export class AuthPayload {
    @Field()
    token: string;
    expires_in?: number;
}

@InputType()
export class PaginationArgs {
    @Field() page: number;
    @Field() perPage: number;

    skipTakeOptions(): { skip: number, take: number } {
        return {
            skip: (this.page - 1) * this.perPage,
            take: this.perPage
        }
    }
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
export class FeedbackInfoArgs {
    @Field() email: string;
    @Field() phone: string;
    @Field() content: string;
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
