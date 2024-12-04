import app from './app';
import {databaseInit} from "@/utils/db";
import logger from "./utils/logger";

const port = process.env.PORT || 3000;

databaseInit().then(() => {
    logger.info(`Connected to Database`)
    app.listen(port, () => {
        logger.info(`Server is running in port: ${port}`);
    });
}).catch((error: any) => {
    logger.error(`Error connecting to database: ${error}`);
})