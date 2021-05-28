// @flow

import type {CommandBus} from "../../domain/CommandBus";
import type {Command} from "../../domain/Command";
import {CommandHandlersInformation} from "./CommandHandlersInformation";

export class InMemoryCommandBus implements CommandBus {

    #commandHandlersInformation: CommandHandlersInformation;

    constructor(commandHandlersInformation: CommandHandlersInformation) {
        this.#commandHandlersInformation = commandHandlersInformation;
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.#commandHandlersInformation.search(command);

        await handler.handle(command);
    }
}
