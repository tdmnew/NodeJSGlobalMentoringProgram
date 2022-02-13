import { Request, NextFunction } from 'express';

const apiLogger = (req: Request, {}, next: NextFunction) => {
    const { body, originalUrl, method } = req;

    console.table({
        Path: originalUrl,
        Method: method,
        'Request Body': JSON.stringify(body)
    });

    next();
};

export default apiLogger;
