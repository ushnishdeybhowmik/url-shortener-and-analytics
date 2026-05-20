import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});