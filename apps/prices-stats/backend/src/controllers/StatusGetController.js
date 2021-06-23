// @flow
import httpStatus from 'http-status';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  async run(req: express$Request, res: express$Response) {
    console.log(">>>>>>");
    res.status(httpStatus.OK);
    res.json({status: 'OK!'}).send();
  }
}
