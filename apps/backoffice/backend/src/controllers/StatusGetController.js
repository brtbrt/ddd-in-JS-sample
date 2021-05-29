// @flow
import httpStatus from 'http-status';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
    async run(req: express$Request, res: express$Response) {
        res.json('OK!');
        res.status(httpStatus.OK).send();
    }
}
