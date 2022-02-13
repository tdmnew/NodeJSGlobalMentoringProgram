import { Request, Response } from 'express';
import morgan, { Options } from 'morgan';

export interface HttpLoggerServiceInterface {
    logger: typeof morgan;
}

export type Handler = {
    format: string;
    options: Options<Request, Response>;
};
