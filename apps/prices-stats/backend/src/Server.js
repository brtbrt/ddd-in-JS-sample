// @flow
import express from 'express';
import * as spdy from 'spdy';
import { readFileSync } from 'fs';
import Router from 'express-promise-router';
import { registerRoutes } from './routes';

export class Server {
  #express: express$Application<any, any>;
  #port: string;
  #httpServer: any;

  constructor(port: string) {
    this.#port = port;
    this.#express = express();

    const router = Router();
    this.#express.use(router);

    registerRoutes(router);
  }

  async listen(): Promise<void> {
    const env: string = (this.#express.get('env'): any);
    const options = {
      key: readFileSync(`${__dirname}/../config/certs/localhost-privkey.pem`),
      cert: readFileSync(`${__dirname}/../config/certs/localhost-cert.pem`),
    };

    return new Promise((resolve) => {
      this.#httpServer = spdy.createServer(options, this.#express);
      this.#httpServer.listen(this.#port, () => {
        console.log(`  Backend App is running ${env} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }
}
