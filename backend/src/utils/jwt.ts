import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function generateAccessToken(userId: string) {
    return jwt.sign(
        { userId },
        env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, env.JWT_SECRET!);
    } catch (error) {
        return null;
    }
}