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
