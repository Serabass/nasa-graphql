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
