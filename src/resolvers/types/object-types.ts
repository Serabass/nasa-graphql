import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class APODResponse {
    @Field() public copyright: string;
    @Field() public date: string;
    @Field() public explanation: string;
    @Field() public hdurl: string;
    @Field() public media_type: string; // maybe enum
    @Field() public service_version: string;
    @Field() public title: string;
    @Field() public url: string;
}
