// @flow

import type {Command} from "../../domain/Command";
import type {CommandHandler} from "../../domain/CommandHandler";
import {CommandNotRegisteredError} from "../../domain/CommantNotRegisteredError";

export class CommandHandlersInformation {
    #commandHandlersMap: Map<Command, CommandHandler<Command>>;

    constructor(commandHandlers: Array<CommandHandler<Command>>) {
        this.#commandHandlersMap = this._formatHandlers(commandHandlers);
    }

    search(command: Command): CommandHandler<Command> {
        let commandHandler = this.#commandHandlersMap.get(command.constructor);

        if (!commandHandler) {
            throw new CommandNotRegisteredError(command);
        }

        return commandHandler;
    }

    _formatHandlers(commandHandlers: Array<CommandHandler<Command>>): Map<Command, CommandHandler<Command>> {
        const handlersMap = new Map();

        commandHandlers.forEach(commandHandler => {
            handlersMap.set(commandHandler.subscribedTo(), commandHandler);
        });

        return handlersMap;
    }
}