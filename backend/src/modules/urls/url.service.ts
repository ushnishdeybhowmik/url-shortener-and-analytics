import { prisma } from "../../lib/prisma.js";
import {generateShortCode} from "../../utils/shortCode.js";


export const createUrl = async (userId: string, originalUrl: string) => {
    const shortCode = generateShortCode();

    return prisma.url.create({
        data: {
            userId,
            originalUrl,
            shortCode
        }
    });
}
