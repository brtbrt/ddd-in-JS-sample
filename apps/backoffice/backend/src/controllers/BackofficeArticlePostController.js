// @flow
import httpStatus from 'http-status';
import { Controller } from './Controller';
import {CreateBackofficeArticleCommand} from "context-backoffice/Articles/application/CreateBackofficeArticleCommand";
import type {CommandBus} from "context-shared/domain/CommandBus";
import {BackofficeArticleAlreadyExists} from "context-backoffice/Articles/domain/BackofficeArticleAlreadyExists";
import {InvalidArgumentError} from "context-shared/domain/value-object/InvalidArgumentError";

export default class BackofficeArticlePostController implements Controller {
    #commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.#commandBus = commandBus;
    }

    async run(req: express$Request, res: express$Response) {
        const id: string = req.params.id;
        const name: string = (req.body: Object).name;
        const upc: string = (req.body: Object).upc;
        const createBackofficeArticleCommand = new CreateBackofficeArticleCommand({ id, name, upc });

        try {
            await this.#commandBus.dispatch(createBackofficeArticleCommand);
        } catch (error) {
            if (error instanceof BackofficeArticleAlreadyExists) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else if (error instanceof InvalidArgumentError) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                console.log(error);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }

        res.status(httpStatus.CREATED).send();
    }
}
