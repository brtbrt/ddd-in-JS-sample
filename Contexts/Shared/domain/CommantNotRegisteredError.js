// @flow
import { Command } from './Command';

export class CommandNotRegisteredError extends Error {
    constructor(command: Command) {
        super(`No command handler associated to the command: <${command.constructor.name}>`);
    }
}
