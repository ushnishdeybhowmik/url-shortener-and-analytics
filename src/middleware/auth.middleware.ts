import {NextFunction, Request, Response} from 'express';
import {verifyToken} from '../utils/jwt.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: 'AUTH_HEADER_MISSING'});
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({message: 'AUTH_TOKEN_MISSING'});
        }

        const decoded = verifyToken(token) as { userId: string };

        req.user = { id: decoded.userId };

        next();
    }
    catch (error) {
        return res.status(401).json({message: 'INVALID_AUTH_TOKEN'});
    }
}
