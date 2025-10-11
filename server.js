import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../route/api.js";
import cors from "cors";

const web = express();
web.use(express.json());
web.use(cors({
    origin: 'http://content_management_dipzz.vercel.app', 
    credentials: true
}));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);

import winston from "winston";

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
