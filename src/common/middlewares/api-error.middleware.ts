import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../../utils/http-codes';
import { INTERNAL_SERVER_ERROR_MSG } from '../../utils/messages';
import { ApiError } from '../errors/api-error';

export const apiErrorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = (err as ApiError).status || INTERNAL_SERVER_ERROR;
  const errorCode = (err as ApiError).errorCode || 'undefined_error_code';

  res.statusCode = status;

  res.json({
    status,
    errorCode,
    message: err.message || INTERNAL_SERVER_ERROR_MSG,
  });
};
