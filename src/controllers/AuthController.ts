import { ErrorRequestHandler, Request, Response } from "express";
import { loginService, registerService } from "../services/UserService";
import { loginSchema, registerSchema } from "../validations/UserValidation";

export async function login(req: Request, res: Response) {
    try {
        const data = loginSchema.parse(req.body)

        const user = await loginService(data);

        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) {

            return res.status(401).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Unexpected error'
        });
    }
}

export async function register(req: Request, res: Response) {
    try {
        const data = registerSchema.parse(req.body)

        const user = await registerService(data)

        res.status(201).json(user)
    } catch (error) {

        if (error instanceof Error) {
            return res.status(401).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Unexpected error'
        });
    }
}