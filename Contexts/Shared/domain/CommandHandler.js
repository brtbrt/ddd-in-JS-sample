// @flow

import { Command } from './Command';

export interface CommandHandler<-C: Command> {
    subscribedTo(): Command;
    handle(command: C): Promise<void>;
}