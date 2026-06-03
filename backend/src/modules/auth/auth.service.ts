import {prisma} from '../../lib/prisma.js';
import {hashPassword, comparePasswords} from '../../utils/hash.js';
import {generateAccessToken, verifyToken} from '../../utils/jwt.js';

export async function registerUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique(
        {
            where: {email},
        }
    )

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    const token = generateAccessToken(user.id);

    const resUser = {
        id: user.id,
        email: user.email,
    }

    return {user : resUser, token};
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {email},
    });
    
    if (!user) {
        throw new Error('Invalid credentials.');
    }

    const validPassword = await comparePasswords(password, user.password);

    if (!validPassword) {
        throw new Error('Invalid credentials.');
    }

    const token = generateAccessToken(user.id);

    const resUser = {
        id: user.id,
        email: user.email,
    }
    
    return {user: resUser, token};
}

