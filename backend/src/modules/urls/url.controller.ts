import {createUrlSchema} from './url.validation.js';
import { createUrl, getUrlByShortCode } from './url.service.js';
import { Request, Response} from 'express';

export const createUrlHandler = async (req: Request, res: Response) => {
    try {
        console.log("Received request to create URL with body:", req.body);
        const validatedData = createUrlSchema.safeParse(req.body);

        if(!validatedData.success) {
            return res.status(400).json({message: "Invalid Request Data. originalUrl must be a valid URL."});
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

export const redirectUrlHandler = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;
        // console.log("Received request to redirect shortCode:", shortCode);
        const urlRecord = await getUrlByShortCode(shortCode as string);

        if (!urlRecord) {
            return res.status(404).json({ message: "URL not found" });
        }
        
        return res.redirect(urlRecord.originalUrl);
    }
    catch (error) {
        console.error("Error redirecting URL:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}