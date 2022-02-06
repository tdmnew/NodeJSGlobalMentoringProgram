import { Request, Response, NextFunction } from 'express';

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
    const { body, originalUrl, method } = req;

    const oldSend = res.send;
    res.send = (data) => {
        res.send = oldSend;
        res.locals.body = JSON.stringify(data);
        return res.send(data);
    };

    console.table({
        Path: originalUrl,
        Method: method,
        'Request Body': JSON.stringify(body)
    });

    next();
};

export default apiLogger;
