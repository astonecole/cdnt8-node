import * as bcryptjs from 'bcryptjs';
import { validate, Validator, ValidationError } from 'class-validator';
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Role } from '../entity/Role';

export class UserController {

    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        const body = request.body as User;
        const user = new User();

        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.password = body.password;
        user.birthdate = new Date();

        const errors: ValidationError[] = await validate(user);
        if (errors.length > 0) {
            response.status(400);
            return { error: 'Bad Request', code: 400 };
        }

        user.password = await bcryptjs.hashSync(user.password);

        const repoRole = getRepository(Role);
        const role = await repoRole.findOne({ where: { name: 'User' } })
        if (!role) {
            response.status(500);
            return { error: 'Internal Server Error', code: 500 };
        }

        user.roles = [role];

        try {
            response.status(201);
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                response.status(409);
                return { error: 'Conflict', code: error.code };
            }
            console.log(error);
            response.status(422);
            return { error: 'UnprocessableEntity', code: 422 };
        }

        return user;
    }

    async authenticate(request: Request, response: Response) {
        return {};
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}