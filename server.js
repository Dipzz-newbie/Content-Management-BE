import express from "express";
import {publicRouter} from "./src/route/public-api.js";
import {errorMiddleware} from "./src/middleware/error-middleware.js";
import {userRouter} from "./src/route/api.js";
import cors from "cors";
import winston from "winston";

const web = express();
web.use(express.json());
web.use(cors({
    origin: 'https://contentmanagementproject.vercel.app', 
    credentials: true
}));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
});

web.listen(3000, () => {
    logger.info("App start");
});
