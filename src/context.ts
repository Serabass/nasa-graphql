import URLEx from "./URLEx";

/**
 * GraphQL server context type
 */
export interface Context {
  API_KEY: string;
  rootUrl: string;
  url: URLEx;
  pathChunks: string[];
  searchParams: {[key: string]: string};
  rateLimitRemaining?: number;
}
