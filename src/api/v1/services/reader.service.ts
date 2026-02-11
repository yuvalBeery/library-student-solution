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

