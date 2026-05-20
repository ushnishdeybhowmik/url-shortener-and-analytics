import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || '',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
}

export default env;