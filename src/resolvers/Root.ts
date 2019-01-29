import {Ctx, Mutation, Query} from "type-graphql";
import {PaperfoxQuery} from "./PaperfoxQuery";
import {AuthMutation} from "./AuthMutation";
import {Context} from "../context";
import {PaperfoxMutation} from "./PaperfoxMutation";

export class RootQueries {
    @Query((type) => PaperfoxQuery, {nullable: true})
    public async Paperfox(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}

export class RootMutations {
    @Mutation((type) => PaperfoxMutation, {nullable: true})
    public async Paperfox(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

    @Mutation((type) => AuthMutation, {nullable: true})
    public async Auth(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}
