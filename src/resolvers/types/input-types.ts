import {InputType, Field} from "type-graphql";

@InputType()
export class PaginationArgs {
    @Field() public page: number;
    @Field() public perPage: number;

    public skipTakeOptions(): { skip: number, take: number } {
        return {
            skip: (this.page - 1) * this.perPage,
            take: this.perPage,
        };
    }
}

@InputType()
export class CartItemArgs {
    @Field() public productId: number;
    @Field() public count: number;
}

@InputType()
export class CartArgs {
    @Field((type) => [CartItemArgs]) public items: CartItemArgs[];
}

@InputType()
export class FeedbackInfoArgs {
    @Field() public email: string;
    @Field() public phone: string;
    @Field() public content: string;
}

@InputType()
export class SignUpArgs {
    @Field() public firstName: string;
    @Field() public lastName: string;
    @Field() public password: string;
    @Field() public email: string;
}

@InputType()
export class SignInArgs {
    @Field() public email: string;
    @Field() public password: string;
}

@InputType()
export class SWAPIFilmArgs {
    @Field() public id: number;
}

export interface AuthTokenPayload {
    id: number;
    email: string;
}
