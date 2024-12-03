export class IError extends Error {
    statusCode: number;
    stackError?: string
    constructor(message: string, stackError?: string) {
        super(message);
        this.statusCode = 500;
        if (stackError)
            this.stackError = stackError;
    }
}

export class NotFoundError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

export class ForbiddenError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;

    }
}

export class UnauthorizedError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

export class BadRequestError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}

export class ExistingError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "ExistingError";
        this.statusCode = 409;
    }
}

export class UnprocessedError extends IError {
    constructor(message: string) {
        super(message);
        this.name = "UnprocessedError";
        this.statusCode = 422;
    }
}