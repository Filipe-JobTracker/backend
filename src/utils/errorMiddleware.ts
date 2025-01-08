import {Request, Response} from 'express';
import logger from "../utils/logger";
import {IError} from "@/types/errors";
import {ValidateError} from "tsoa";

export function errorHandlerMiddleware(err: Error, req: Request, res: Response) {

    if (err instanceof ValidateError) {
        logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
        return;
    }

    if (err instanceof IError && err.statusCode && err.statusCode >= 400 && err.statusCode < 600) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        return ;
    }

    logger.error(err);
    res.status(500).json({
        message: "Internal Server Error",
    });
}

