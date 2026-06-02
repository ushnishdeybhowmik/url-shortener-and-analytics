import crypto from 'crypto';

export function generateShortCode(length: number = 4): string {
    return crypto.randomBytes(length).toString('base64url');
}