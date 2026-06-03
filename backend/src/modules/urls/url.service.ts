import { prisma } from "../../lib/prisma.js";
import { redisClient } from "../../lib/redis.js";
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
    const cacheKey = `url:${shortCode}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        console.log("Cache hit for shortCode:", shortCode);
        return JSON.parse(cached);
    }


    const url = await prisma.url.findUnique({
        where: {
            shortCode
        }
    });

    if (url) {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(url)); // Cache for 1 hour
    }

    return url;
}

export const recordClick = async (urlId: string) => {
    return prisma.click.create({
        data: {
            urlId
        }
    });
}

export const getUrlAnalytics = async ( urlId: string, userId: string) => {
    const url = await prisma.url.findFirst({
        where: {
            id: urlId,
            userId
        },
        include: {
            clicks: true
        }
    });

    if (!url) {
        return null;
    }

    return {
        id: url.id,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        totalClicks: url.clicks.length,
        createdAt: url.createdAt
    }

}

export const getUserUrls = async (userId: string) => {
    const urls = await prisma.url.findMany({
        where: {
            userId
        },
        include: {
            clicks: true
        }
    });

    return urls.map(url => ({
        id: url.id,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        totalClicks: url.clicks.length,
        createdAt: url.createdAt
    }));
}