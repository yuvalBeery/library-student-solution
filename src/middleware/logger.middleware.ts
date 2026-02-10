import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  logger.info(`${req.method} ${req.url}`);
  next();
};