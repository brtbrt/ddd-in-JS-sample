// @flow

import type {AggregateRoot} from "../../../Shared/domain/AggregateRoot";
import {AggregateEvents} from "../../../Shared/domain/AggregateRoot";
import {DomainEvent} from "../../../Shared/domain/DomainEvent";
import {ArticlesCounterId} from "./ArticlesCounterId";
import ArticlesCounterTotal from "./ArticlesCounterTotal.js";

export default class ArticlesCounter implements AggregateRoot {
    #id: ArticlesCounterId;
    #total: ArticlesCounterTotal;
    // #existingCourses: Array<CourseId>;

    #events: AggregateEvents;

    constructor(id: ArticlesCounterId, total: ArticlesCounterTotal) {
        //, , existingCourses?: Array<CourseId>
        this.#events = new AggregateEvents();
        
        this.#total = total;
        this.#id = id;
    }

    pullDomainEvents(): Array<DomainEvent> {
        return this.#events.pullDomainEvents();
    }

    record(event: DomainEvent): void {
        this.#events.record(event);
    }

    get total(): ArticlesCounterTotal {
        return this.#total;
    }

    toPrimitives(): any {
        return {
            id: this.#id.value,
            total: this.total.value,
            // existingCourses: this.existingCourses.map(courseId => courseId.value)
        };
    }

    static fromPrimitives(data: { id: string; total: number }): ArticlesCounter {
        return new ArticlesCounter(
            new ArticlesCounterId(data.id),
            new ArticlesCounterTotal(data.total),
        );
    }
}
