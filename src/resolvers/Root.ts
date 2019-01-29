import {Ctx, Mutation, Query} from "type-graphql";
import {StoreQuery} from "./StoreQuery";
import {AuthMutation} from "./AuthMutation";
import {Context} from "../context";
import {StoreMutation} from "./StoreMutation";

export class RootQueries {
    @Query((type) => StoreQuery, {nullable: true})
    public async Store(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}

export class RootMutations {
    @Mutation((type) => StoreMutation, {nullable: true})
    public async Store(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

    @Mutation((type) => AuthMutation, {nullable: true})
    public async Auth(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}
