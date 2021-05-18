// @flow

export interface Controller {
  run(req: express$Request, res: express$Response): Promise<void>;
}
