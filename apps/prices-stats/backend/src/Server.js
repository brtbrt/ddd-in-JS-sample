// @flow
import express from 'express';
import * as spdy from 'spdy';
import { readFileSync } from 'fs';
import Router from 'express-promise-router';
import { registerRoutes } from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';

export class Server {
  #express: express$Application<any, any>;
  #port: string;
  #httpServer: any;

  constructor(port: string) {
    this.#port = port;
    this.#express = express();

    this.#express.use(bodyParser.json());
    this.#express.use(bodyParser.urlencoded({ extended: true }));

    this.#express.use(helmet.xssFilter());
    this.#express.use(helmet.noSniff());
    this.#express.use(helmet.hidePoweredBy());
    this.#express.use(helmet.frameguard({ action: 'deny' }));

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


    // {
    //   spdy?: {
    //     protocols?: server$Protocol[],
    //     plain?: boolean,
    //     "x-forwarded-for"?: boolean,
    //     connection?: {
    //       windowSize?: number,
    //       autoSpdy31?: boolean,
    //       ...
    //     },
    //     ...
    //   },
    // ...
    // } & https.ServerOptions

    const newOptions = {
      spdy: {
        protocols: ['http/1.1'],
        plain: true,
        ssl: false
      }
    };

    return new Promise((resolve) => {
      this.#httpServer = spdy.createServer(newOptions, this.#express);
      this.#httpServer.listen(this.#port, () => {
        console.log(`  Backend App is running ${env} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }
}
