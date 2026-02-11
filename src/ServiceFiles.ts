--------------------------------------------------------------------------------
// services\reader.service.ts
--------------------------------------------------------------------------------
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from "typeorm";
import { Reader } from "../entities/Reader.entity";
import { NotFoundError } from "../errors/notFoundError";
import { myDataSource } from "../connection/data-source";
import { FavBookDTO } from "../dto/FavBookDTO";
import { PostgresErrorCode } from "../enums/postgresErrors.enum";
import { ConflictError } from "../errors/conflictError";
import { Book } from "../entities/Book.entity";
import { getAllBooks } from "./book.service";

const readerRepository: Repository<Reader> = myDataSource.getRepository(Reader);


const createReader = async (
  firstName: string,
  lastName: string,
  favoriteBooks: FavBookDTO[],
): Promise<Reader> => {
  try {
    const reader: Reader = readerRepository.create({
      firstName,
      lastName,
      favoriteBooks,
    });

    const ids = await (await getAllBooks()).map((book) => book.id);

    const favoriteBooksIdArr = favoriteBooks.map((ids) => ids.id);

    const length = favoriteBooksIdArr.length;
    const newLength = favoriteBooksIdArr.filter((idToFind) =>
      ids.findIndex((id) => id === idToFind),
    ).length;

    if (length !== newLength) {
      throw new NotFoundError(
        "One or more favorite books not found " +
          "- please check that all book IDs exist",
      );
    }

    return await readerRepository.save(reader);
  } catch (error: unknown) {
    throw error;
  }
};

export { createReader };

--------------------------------------------------------------------------------
// services\book.service.ts
--------------------------------------------------------------------------------
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Book } from "../entities/Book.entity";
import { NotFoundError } from "../errors/notFoundError";
import { myDataSource } from "../connection/data-source";
import { BookGenre } from "../entities/BookGenre.entity";

const bookRepository: Repository<Book> = myDataSource.getRepository(Book);
const bookGenreRepository: Repository<BookGenre> =
  myDataSource.getRepository(BookGenre);

const getFavoriteBooks = async (): Promise<Book[]> => {
  const favBookCounter = await bookRepository
    .createQueryBuilder("book")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .select("COUNT(favoriteBooks.id)", "favAmount")
    .orderBy("COUNT(favoriteBooks.id)")
    .limit(1)
    .getRawOne();

  const result = await bookRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.author", "author")
    .leftJoinAndSelect("book.genre", "genre")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .groupBy("author.id")
    .addGroupBy("genre.id")
    .addGroupBy("book.id")
    .having("COUNT (favoriteBooks.id) = :favBookCounter", {
      favBookCounter: favBookCounter.favAmount,
    })
    .getMany();

  return result;
};

const getAllGenre = async (): Promise<BookGenre[]> => {
  return await bookGenreRepository.find();
};


const getAllBooks = async (): Promise<Book[]> => {
  return await bookRepository.find();
};

const verifyIdInTable = (ids: number[], givenId: number, error: string) => {
  if (!ids.find((id) => givenId === id)) {
    throw new NotFoundError(error);
  }
};

const getBookById = async (id: number): Promise<Book> => {
  const genre = await bookRepository.findOne({
    where: { id },
    relations: ["genre"],
  });

  if (!genre) {
    throw new NotFoundError("genre not found");
  }

  return genre;
};
const changeBookGenre = async (
  genreId: number,
  bookId: number,
): Promise<void> => {
  const genreIds = (await getAllGenre()).map((genre) => genre.id);
  verifyIdInTable(genreIds, genreId,`The genre with id ${genreId} was not found`);
  
  const bookIds = (await getAllBooks()).map((book) => book.id);
  verifyIdInTable(bookIds, bookId,`The book with id ${bookId} was not found`);
  
  const updatedBook = (await getBookById(bookId))
  updatedBook.genre.id = genreId;
  const updatedResult: UpdateResult = await bookRepository
  .update(bookId,updatedBook );

  if (updatedResult.affected === 0) {
    throw new NotFoundError("the genre was not updated");
  }
};

export { getFavoriteBooks, changeBookGenre, getAllBooks };

--------------------------------------------------------------------------------
// api\v1\services\reader.service.ts
--------------------------------------------------------------------------------
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from "typeorm";
import { Reader } from "../../../entities/Reader.entity";
import { NotFoundError } from "../../../errors/notFoundError";
import { myDataSource } from "../../../connection/data-source";
import { FavBookDTO } from "../../../dto/FavBookDTO";
import { PostgresErrorCode } from "../../../enums/postgresErrors.enum";
import { ConflictError } from "../../../errors/conflictError";
import { Book } from "../../../entities/Book.entity";
import { getAllBooks } from "./book.service";
import {createReader} from "../../../services/reader.service"

const readerRepository: Repository<Reader> = myDataSource.getRepository(Reader);


export { 
  createReader as createReaderV2,
};

--------------------------------------------------------------------------------
// api\v1\services\book.service.ts
--------------------------------------------------------------------------------
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Book } from "../../../entities/Book.entity";
import { NotFoundError } from "../../../errors/notFoundError";
import { myDataSource } from "../../../connection/data-source";
import { BookGenre } from "../../../entities/BookGenre.entity";

const bookRepository: Repository<Book> = myDataSource.getRepository(Book);
const bookGenreRepository: Repository<BookGenre> =
  myDataSource.getRepository(BookGenre);

const getFavoriteBooks = async (): Promise<Book[]> => {
  const favBookCounter = await bookRepository
    .createQueryBuilder("book")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .select("COUNT(favoriteBooks.id)", "favAmount")
    .orderBy("COUNT(favoriteBooks.id)")
    .limit(1)
    .getRawOne();

  const result = await bookRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.author", "author")
    .leftJoinAndSelect("book.genre", "genre")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .groupBy("author.id")
    .addGroupBy("genre.id")
    .addGroupBy("book.id")
    .having("COUNT (favoriteBooks.id) = :favBookCounter", {
      favBookCounter: favBookCounter.favAmount,
    })
    .getMany();

  return result;
};

const getAllGenre = async (): Promise<BookGenre[]> => {
  return await bookGenreRepository.find();
};


const getAllBooks = async (): Promise<Book[]> => {
  return await bookRepository.find();
};

const verifyIdInTable = (ids: number[], givenId: number, error: string) => {
  if (!ids.find((id) => givenId === id)) {
    throw new NotFoundError(error);
  }
};

const getBookById = async (id: number): Promise<Book> => {
  const genre = await bookRepository.findOne({
    where: { id },
    relations: ["genre"],
  });

  if (!genre) {
    throw new NotFoundError("genre not found");
  }

  return genre;
};
const changeBookGenre = async (
  genreId: number,
  bookId: number,
): Promise<void> => {
  const genreIds = (await getAllGenre()).map((genre) => genre.id);
  verifyIdInTable(genreIds, genreId,`The genre with id ${genreId} was not found`);
  
  const bookIds = (await getAllBooks()).map((book) => book.id);
  verifyIdInTable(bookIds, bookId,`The book with id ${bookId} was not found`);
  
  const updatedBook = (await getBookById(bookId))
  updatedBook.genre.id = genreId;
  const updatedResult: UpdateResult = await bookRepository
  .update(bookId,updatedBook );

  if (updatedResult.affected === 0) {
    throw new NotFoundError("the genre was not updated");
  }
};

export { getFavoriteBooks, changeBookGenre, getAllBooks };