import { Request, Response, NextFunction } from "express";
import {
  updateBookV2, getMostBorrowsBooksV2
} from "../services/book.service";
import { StatusCodes } from "http-status-codes";
import logger from "../../../logger/logger";

const updateBookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await updateBookV2(Number(req.params.bookId), req.body.genreId);

    logger.info(`the book genre for book with ID ${(req.params.bookId)} has been changed`)
    res.status(StatusCodes.OK).send(`the book genre for book with ID ${(req.params.bookId)} has been changed`);
  } catch (error) {
    logger.error(error.message)
    next(error);
  }
};


const getMostBorrowsBooksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mostBorrows = await getMostBorrowsBooksV2();

    logger.info(`Successful operation getting most borrows books`)
    res.status(StatusCodes.OK).send({data : mostBorrows});
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

export {
  updateBookHandler, getMostBorrowsBooksHandler
};
