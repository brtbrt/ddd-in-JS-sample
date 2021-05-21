// @flow

import ArticlesCounter from "./ArticlesCounter";
import type {Nullable} from "../../../Shared/domain/Nullable";

export interface ArticlesCounterRepository {
    search(): Promise<Nullable<ArticlesCounter>>;
}
