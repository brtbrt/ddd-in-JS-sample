// @flow

import type { Query } from "./Query";
import type { Response } from "./Response";

export interface QueryBus {
  ask<+R: Response>(query: Query): Promise<R>;
}
