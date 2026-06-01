import {Request, Response} from 'express';
import {registerUser, loginUser} from './auth.service.js';
import {registerSchema, loginSchema} from './auth.validation.js';

export async function register(req: Request, res: Response) {
    const validatedData = registerSchema.safeParse(req.body);
    
    if (!validatedData.success) {
        return res.status(400).json({message: "Invalid Request Data"});
    }

    const result = await registerUser(validatedData.data.email, validatedData.data.password);
    
    res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
    const validatedData = loginSchema.safeParse(req.body);
    
    if (!validatedData.success) {
        return res.status(400).json({message: "Invalid Request Data"});
    }

    const result = await loginUser(validatedData.data.email, validatedData.data.password);
    
    res.status(200).json(result);
}