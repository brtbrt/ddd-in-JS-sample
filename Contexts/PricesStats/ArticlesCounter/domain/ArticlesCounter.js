// @flow

import type {AggregateRoot} from "context-shared/domain/AggregateRoot";
import {AggregateEvents} from "context-shared/domain/AggregateRoot";
import {DomainEvent} from "context-shared/domain/DomainEvent";
import {ArticlesCounterId} from "./ArticlesCounterId";
import ArticlesCounterTotal from "./ArticlesCounterTotal.js";
import {ArticlesCounterIncrementedDomainEvent} from "./ArticlesCounterIncrementedDomainEvent";
import type {PublishableDomainEvent} from "context-shared/domain/PublishableDomainEvent";
import type {DomainEventInterface} from "context-shared/domain/DomainEventInterface";

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

    increment() {
        this.#total = this.#total.increment();
        this.record(new ArticlesCounterIncrementedDomainEvent({id: this.#id.value, total: this.#total.value }));
    }

    pullDomainEvents(): Array<PublishableDomainEvent & DomainEventInterface> {
        return this.#events.pullDomainEvents();
    }

    record(event: PublishableDomainEvent & DomainEventInterface): void {
        this.#events.record(event);
    }

    get total(): ArticlesCounterTotal {
        return this.#total;
    }

    static initialize(id: ArticlesCounterId): ArticlesCounter {
        return new ArticlesCounter(id, ArticlesCounterTotal.initialize())
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
