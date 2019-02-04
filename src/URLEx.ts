import {URL} from "url";
import fetch from "node-fetch";
import {Context} from "./context";

export default class URLEx extends URL {
    public static async fetch<T = any>(ctx: Context, pathname, args): Promise<T> {
        let urlEx = new URLEx(ctx.rootUrl);
        urlEx.pathname = pathname;

        if (ctx.API_KEY) {
            urlEx.searchParams.append("api_key", ctx.API_KEY);
        }
        if (args) {
            Object.keys(args)
                .forEach((key) => {
                    urlEx.searchParams.append(key, args[key]);
                });
        }
        let url = urlEx.toString();
        let response = await fetch(url);
        let limit = response.headers.get("x-ratelimit-limit");
        let remaining = response.headers.get("x-ratelimit-remaining");

        let json = await response.json();
        (global as any).rateLimit = parseInt(limit, 10);
        (global as any).rateLimitRemaining = parseInt(remaining, 10);
        return json as T;
    }
}
