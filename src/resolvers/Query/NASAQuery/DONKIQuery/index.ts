import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";

@ArgsType()
class DONKIArgs {
    @Field({nullable: true}) public startDate: string;
    @Field({nullable: true}) public endDate: string;
}

@ObjectType()
class IPSResponse {
    @Field({nullable: true}) public catalog: string;
}

@ObjectType()
class FLRResponse {
    @Field({nullable: true}) public flrID: string;
}

/**
 * @see https://api.nasa.gov/api.html#DONKI
 */
@ObjectType()
@Resolver(() => DONKIQuery)
export class DONKIQuery {
    @Fetch({
        type: [IPSResponse],
        path: "/IPS",
        args: DONKIArgs,
    })
    public IPS: () => Promise<IPSResponse[]>;

    @Fetch({
        type: [FLRResponse],
        path: "/FLR",
        args: DONKIArgs,
    })
    public FLR: () => Promise<FLRResponse[]>;
}
