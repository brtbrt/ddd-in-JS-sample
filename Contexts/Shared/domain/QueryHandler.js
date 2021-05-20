// @flow

import type {Query} from "./Query";
import type {Response} from "./Response";

export interface QueryHandler<-Q: Query, +R: Response> {
    subscribedTo(): Query;
    handle(query: Q): Promise<R>;
}
