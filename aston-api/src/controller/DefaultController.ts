import { Request, Response } from 'express';

export class DefaultController {

    async hello(request: Request, response: Response) {
        return { message: 'Hello, World!' };
    }

}