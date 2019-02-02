import If from "./if";
import Env from "../env";
import {FieldResolver} from "type-graphql";
import {RemoteApi} from "./remote-api";

function generateCorpDecorator(decorator: any) {
    return (...args) => {
        return If(() => Env.CORP)(decorator(...args));
    };
}

let Corp = {
    FieldResolver: generateCorpDecorator(FieldResolver),
    RemoteApi: generateCorpDecorator(RemoteApi),
};

export default Corp;
