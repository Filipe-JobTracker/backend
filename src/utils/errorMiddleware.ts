import {Request, Response, NextFunction} from 'express';
import logger from "../utils/logger";
import {IError} from "@/types/errors";
import {ValidateError} from "tsoa";

export function errorHandlerMiddleware(err: IError, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ValidateError) {
        logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
        return;
    }

    if (err.statusCode && err.statusCode >= 400 && err.statusCode < 600) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        return ;
    }

    logger.error(err);
    res.status(500).json({
        message: "Internal Server Error",
    });
    // logger.error(`From ${req.ip} at ${req.path}:\n${err.stack}`);
    // return ;
    // let data;
    // if (process.env.NODE_ENV === 'development') {
    //     data = {
    //         error: err.message,
    //         stack: err.stackError
    //     }
    // } else {
    //     data = {
    //         error: err.message
    //     }
    // }
    // res.status(err.statusCode).json(data);
}

