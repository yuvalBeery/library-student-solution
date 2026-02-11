import { Request, Response, NextFunction } from "express";
import { Book } from "../../../entities/Book.entity";
import {
  getFavoriteBooks,
  changeBookGenre,

} from "../services/book.service";
import { StatusCodes } from "http-status-codes";

const getFavoriteBooksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books: Book[] = await getFavoriteBooks();
    
    res.status(StatusCodes.OK).json(books);
  } catch (err: unknown) {
    next(err);
  }
};

const changeBookGenreHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { genreId } = req.body;
    const { bookId } = req.params;

    await changeBookGenre(+genreId, +bookId );

    res.status(StatusCodes.OK)
    .json(`the book genre for book with ID ${bookId} has been changed`);
  } catch (err: unknown) {
    next(err);
  }
};





export {
  getFavoriteBooksHandler,
  changeBookGenreHandler,

};
