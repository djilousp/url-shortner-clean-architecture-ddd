import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ShortUrlError } from '../../domain/errors/short-url.error';
import { GenericError } from '../../domain/errors/generic.error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.constructor) {
    case ShortUrlError.ShortUrlNotFoundError:
      console.error(error.message);
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    case ShortUrlError.InvalidLongUrlError:
      console.error(error.message);
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    case GenericError:
      console.error(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
