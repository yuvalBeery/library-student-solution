import { Request, Response, NextFunction } from "express";
import {
  updateBook, getMostBorrowsBooks
} from "../services/book.service";
import { StatusCodes } from "http-status-codes";
import logger from "../../../logger/logger";

const updateBookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await updateBook(Number(req.params.bookId), req.body.genreId);

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
    const mostBorrows = await getMostBorrowsBooks();

    logger.info(`Successful operation getting most borrows books`)
    res.status(StatusCodes.OK).send(mostBorrows);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

export {
  updateBookHandler, getMostBorrowsBooksHandler
};
