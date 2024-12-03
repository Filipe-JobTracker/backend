import "reflect-metadata";
import "./utils/config";
import logger from "./utils/logger";
import cors from "cors";
import express, {Express, Request} from "express";
import {errorHandlerMiddleware} from "@/utils/errorMiddleware";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../public/swagger.json";
import {RegisterRoutes} from "@/routes/routes";
import {databaseInit} from "@/utils/db";

const port = process.env.PORT || 3000;

// Mandatory Server Setup
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors<Request>());
app.set('trust proxy', true);

// Routes + Swagger
RegisterRoutes(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandlerMiddleware);
app.use((req, res) => {
    res.status(404).json({error: `Cannot find ${req.path}`})
    logger.error(`Bad request from: ${req.ip}, path: ${req.path}`);
});

// Launch API Server
databaseInit().then(() => {
    logger.info(`Connected to Database`)
    app.listen(port, () => {
        logger.info(`Server is running in port: ${port}`);
    });
}).catch((error: any) => {
    logger.error(`Error connecting to database: ${error}`);
})