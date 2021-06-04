// @flow

import {ArticlesCounterRepository} from "../../domain/ArticlesCounterRepository";
import ArticlesCounter from "../../domain/ArticlesCounter";
import type {EventBus} from "context-shared/domain/EventBus";
import {ArticlesCounterId} from "../../domain/ArticlesCounterId";

export class ArticlesCounterIncrementer {
    #repository: ArticlesCounterRepository;
    #eventBus: EventBus;

    constructor(repository: ArticlesCounterRepository, eventBus: EventBus) {
        this.#repository = repository;
        this.#eventBus = eventBus;
    }

    async run() {
        const savedCounter = (await this.#repository.search());
        const counter = savedCounter ?? this._initializeCounter();

        console.log('TROVATO');
        console.log(counter);
        console.log(counter.toPrimitives());
        console.log('---')
        
        counter.increment();
        console.log('INCREMENTATO');
        console.log(counter);
        console.log(counter.toPrimitives());
        console.log('---')

        await this.#repository.save(counter);
        // await this.#eventBus.publish(counter.pullDomainEvents());

        // todo maintain the aggregate IDs for a better counter (duplicate events etc)
        // if (!counter.hasIncremented(articleId)) {
        //
        // }
    }

    _initializeCounter(): ArticlesCounter {
        return ArticlesCounter.initialize(ArticlesCounterId.random());
    }
}
