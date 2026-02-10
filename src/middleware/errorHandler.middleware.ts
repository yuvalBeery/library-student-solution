import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { 
  libraryError
} from "../errors/libraryError";
import logger from "../logger/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`${err.name}: ${err.message}`);

  if (err instanceof libraryError) {
    res.status(err.statusCode);
    res.json(err.baseError);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export { errorHandler };
