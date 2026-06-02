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

export const getUrlByShortCode = async (shortCode: string) => {
    // console.log("Looking up URL with shortCode:", shortCode);
    return prisma.url.findUnique({
        where: {
            shortCode
        }
    });
}

export const recordClick = async (urlId: string) => {
    return prisma.click.create({
        data: {
            urlId
        }
    });
}