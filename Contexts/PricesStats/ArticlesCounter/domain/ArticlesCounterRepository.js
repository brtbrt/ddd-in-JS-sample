// @flow

import ArticlesCounter from "./ArticlesCounter";
import type {Nullable} from "context-shared/domain/Nullable";

export interface ArticlesCounterRepository {
    search(): Promise<Nullable<ArticlesCounter>>;
}
