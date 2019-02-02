import {Ctx, Mutation, Query, Subscription} from "type-graphql";
import {StoreQuery} from "./Query/StoreQuery";
import {AuthMutation} from "./Mutation/AuthMutation";
import {Context} from "../context";
import {StoreMutation} from "./Mutation/StoreMutation";
import {MongoQuery} from "./Query/MongoQuery";
import {SandboxQuery} from "./Query/SandboxQuery";

class RootQueries {
    @Query((type) => StoreQuery, {nullable: true})
    public async Store(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

    @Query((type) => MongoQuery, {nullable: true})
    public async Mongo(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

    @Query((type) => SandboxQuery, {nullable: true})
    public async Sandbox(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

}

class RootMutations {
    @Mutation((type) => StoreMutation, {nullable: true})
    public async Store(@Ctx() ctx: Context): Promise<any> {
        return {};
    }

    @Mutation((type) => AuthMutation, {nullable: true})
    public async Auth(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}
