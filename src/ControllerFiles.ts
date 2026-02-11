--------------------------------------------------------------------------------
// controllers\reader.controller.ts
--------------------------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { Reader } from "../entities/Reader.entity";
import {
  createReader,

} from "../services/reader.service";
import { StatusCodes } from "http-status-codes";

const createReaderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  
  try {
    const { firstName, lastName, favoriteBooks } = req.body;
    await createReader( firstName, lastName, favoriteBooks);

    res.status(StatusCodes.OK).json(`the reader ${firstName} has been added`);
  } catch (err: unknown) {
    next(err);
  }
};



export {
  createReaderHandler,

};

--------------------------------------------------------------------------------
// controllers\book.controller.ts
--------------------------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { Book } from "../entities/Book.entity";
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

--------------------------------------------------------------------------------
// api\v1\controllers\reader.controller.ts
--------------------------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { Reader } from "../../../entities/Reader.entity";
import {
  createReaderV2,

} from "../services/reader.service";
import { StatusCodes } from "http-status-codes";

const createReaderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  
  try {
    const { firstName, lastName, favoriteBooks } = req.body;
    await createReaderV2( firstName, lastName, favoriteBooks);

    res.status(StatusCodes.OK).json(`the reader ${firstName} has been added`);
  } catch (err: unknown) {
    next(err);
  }
};



export {
  createReaderHandler,

};

--------------------------------------------------------------------------------
// api\v1\controllers\book.controller.ts
--------------------------------------------------------------------------------
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