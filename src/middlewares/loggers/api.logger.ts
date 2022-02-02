import { Request, Response, NextFunction } from 'express';

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
    const body = JSON.stringify(req.body);

    console.table({ Time: new Date().toString(), Path: req.originalUrl, Method: req.method, Body: body });

    next();
};

export default apiLogger;
