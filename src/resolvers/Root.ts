import {Ctx, Mutation, Query} from "type-graphql";
import {StoreQuery} from "./StoreQuery";
import {AuthMutation} from "./AuthMutation";
import {Context} from "../context";
import {StoreMutation} from "./StoreMutation";
import {MongoQuery} from "./MongoQuery";
import {SandboxQuery} from "./SandboxQuery";

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
