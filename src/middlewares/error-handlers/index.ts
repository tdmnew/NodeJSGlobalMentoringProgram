import joiError from './joi.error';
import internalError from './internal.error';

const errorHandlers = {
    joiError,
    internalError
};

export default errorHandlers;
