import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import env from "./config/env.js";
import { prisma } from './lib/prisma.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get('/health', async (_, res) => {
    const users = await prisma.user.count();

    res.json({
        status: 'ok',
        users,
    });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});