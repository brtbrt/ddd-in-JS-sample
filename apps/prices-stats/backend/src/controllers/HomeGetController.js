// @flow
import httpStatus from 'http-status';
import { Controller } from './Controller';

export default class HomeGetController implements Controller {
  async run(req: express$Request, res: express$Response) {
    res.send('Ciao, mondo!');
    res.status(httpStatus.OK).send();
  }
}
