import {createUrlSchema} from './url.validation.js';
import { createUrl } from './url.service.js';
import { Request, Response} from 'express';

export const createUrlHandler = async (req: Request, res: Response) => {
    try {
        const validatedData = createUrlSchema.safeParse(req.body);

        if(!validatedData.success) {
            return res.status(400).json({message: "Invalid Request Data"});
        }
        const { originalUrl } = validatedData.data;
        const userId = req.user!.id;

        const result = await createUrl(userId, originalUrl);
        return res.status(201).json(result);

    } catch (error) {
        console.error("Error creating URL:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}