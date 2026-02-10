import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReader } from "../services/reader.service";
import logger from "../logger/logger";

// Requirement 2: Create new Reader
const createReaderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const savedReader = await createReader(req.body);

    logger.info(`The reader ${savedReader.firstName} has been added`)
    res.status(StatusCodes.CREATED).json(`The reader ${savedReader.firstName} has been added`);
  } catch (error) {
    next(error);
  }
};

export {createReaderHandler}