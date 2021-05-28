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
        //todo continue here so as to make the first controller work :) (the PUT). Then, connect the controller to the command bus to make it fully work!
        // Then, create the domain event infrastructure so as to connect the two bounded contexts and increment the counter
        this.#express.get('/', (req, res) => {res.send('ciao!!!');});

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
