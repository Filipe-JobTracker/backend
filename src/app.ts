import "reflect-metadata";
import "./utils/config";
import logger from "./utils/logger";
import cors from "cors";
import express, {Express, Request} from "express";
import {errorHandlerMiddleware} from "@/utils/errorMiddleware";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../public/swagger.json";
import {RegisterRoutes} from "@/routes/routes";
import process from "process";
import path from "path";

// Mandatory Server Setup
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors<Request>());
app.set('trust proxy', true);

// Serving the frontend if we are in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(
        path.join(__dirname, '../../frontend/dist/')));

    app.get(["/applications", "/dashboard", "/companies", "/"], (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
    })
}

// Routes + Swagger
RegisterRoutes(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandlerMiddleware);
app.use((req, res) => {
    res.status(404).json({error: `Cannot find ${req.path}`})
    logger.error(`Bad request from: ${req.ip}, path: ${req.path}`);
});

export default app;