import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { Request, Response } from 'express';
import { Routes } from './routes';
import * as cors from 'cors';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

module.exports = app.listen(PORT, HOST, async () => {
    console.log(`[express] server has started on port ${HOST}:${PORT}`);

    try {
        await createConnection();
    } catch (error) {
        console.log(`[typeorm] connection error: ${error}`);
    }
});
