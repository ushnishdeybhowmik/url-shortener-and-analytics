import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        return null;
    }
}