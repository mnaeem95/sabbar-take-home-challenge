import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { BAD_REQUEST } from '../../utils/http-codes';
import { ApiError } from '../errors/api-error';

export function validationHandler<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), {
      skipMissingProperties,
      validationError: { target: false },
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = getNestedErrorMessage(errors);
        next(new ApiError(BAD_REQUEST, message));
      } else {
        next();
      }
    });
  };
}

function getNestedErrorMessage(errors: ValidationError[]): string {
  const nestedMessage = errors
    .map((error: ValidationError) => {
      if (error.children && error.children.length > 0) {
        const message = getNestedErrorMessage(error.children);
        return message;
      }
      return Object.values(error.constraints);
    })
    .join(', ');
  return nestedMessage;
}
