--------------------------------------------------------------------------------
// app.ts
--------------------------------------------------------------------------------
import cors from "cors";
import express from "express";
import { myDataSource } from "./connection/data-source";
import logger from "./logger/logger";
import { errorHandler } from "./middlewawres/errorHandler.middleware";
import { loggerMiddleware } from "./middlewawres/logger.middleware";
import bookRouterV1 from "./api/v1/routes/book.router";
import readerRouterV1 from "./api/v1/routes/reader.router";

import bookRouter from "./routes/book.router";
import readerRouter from "./routes/reader.router";
myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    app.use(cors())
    app.use(express.json());
    
    app.use(loggerMiddleware);


    app.use("/books",bookRouter)
    app.use("/readers",readerRouter)

    app.use("/v1/books",bookRouterV1)
    app.use("/v1/readers",readerRouterV1)
    
    app.use(errorHandler);


    const port = 3000;
   
    app.listen(port, () => {
      logger.info(`Server started on port: ${port}`)
    });
  })
  .catch((error) => logger.error(error));

--------------------------------------------------------------------------------
// routes\reader.router.ts
--------------------------------------------------------------------------------
import { Router } from "express";
import { 
createReaderHandler,

} from "../controllers/reader.controller";

const router = Router();



 router.post("/", createReaderHandler);



export default router;

--------------------------------------------------------------------------------
// routes\book.router.ts
--------------------------------------------------------------------------------
import { Router } from "express";
import { 
getFavoriteBooksHandler,
changeBookGenreHandler,

} from "../controllers/book.controller";

const router = Router();



 router.get("/favorites", getFavoriteBooksHandler);
 router.patch("/:bookId/genre",changeBookGenreHandler)



export default router;

--------------------------------------------------------------------------------
// middlewawres\logger.middleware.ts
--------------------------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

--------------------------------------------------------------------------------
// middlewawres\errorHandler.middleware.ts
--------------------------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { 
  LibraryError,
} from "../errors/library.error";
import logger from "../logger/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`${err.name}: ${err.message}`);

  if (err instanceof LibraryError) {
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

--------------------------------------------------------------------------------
// logger\logger.ts
--------------------------------------------------------------------------------
import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: "library.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
  ],
});

export default logger;

--------------------------------------------------------------------------------
// errors\notFoundError.ts
--------------------------------------------------------------------------------
import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./library.error";

export class NotFoundError extends LibraryError {
  constructor(details: string) {
    super(StatusCodes.NOT_FOUND, "Not Found", details);
  }
}

--------------------------------------------------------------------------------
// errors\library.error.ts
--------------------------------------------------------------------------------
import { StatusCodes } from "http-status-codes";
import { BaseError } from "./base.error";

export class LibraryError extends Error {
  statusCode: StatusCodes;
  baseError: BaseError;

  constructor(statusCode: StatusCodes, error: string, details: string) {
    super(`${error} - ${details}`);

    this.statusCode = statusCode;
    this.baseError = {
      error,
      details,
    };

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

--------------------------------------------------------------------------------
// errors\conflictError.ts
--------------------------------------------------------------------------------
import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./library.error";

export class ConflictError extends LibraryError {
  constructor(details: string) {
    super(StatusCodes.CONFLICT, "Conflict", details);
  }
}

--------------------------------------------------------------------------------
// errors\base.error.ts
--------------------------------------------------------------------------------
export interface BaseError {
  error: string;
  details: string;
}

--------------------------------------------------------------------------------
// enums\postgresErrors.enum.ts
--------------------------------------------------------------------------------
export enum PostgresErrorCode {
  UNIQUE_VIOLATION = "23505",
  FOREIGN_KEY_VIOLATION = "23503",
  NOT_NULL_VIOLATION = "23502",
  CHECK_VIOLATION = "23514"
}

--------------------------------------------------------------------------------
// dto\FavBookDTO.ts
--------------------------------------------------------------------------------
import { Book } from "../entities/Book.entity";

export type FavBookDTO = Pick<Book, "id" >;

--------------------------------------------------------------------------------
// connection\data-source.ts
--------------------------------------------------------------------------------
import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  schema:'library',
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["./**/*.entity.ts"],
  logging: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
});

--------------------------------------------------------------------------------
// api\v1\routes\reader.router.ts
--------------------------------------------------------------------------------
import { Router } from "express";
import { 
createReaderHandler,

} from "../controllers/reader.controller";

const router = Router();



 router.post("/", createReaderHandler);



export default router;

--------------------------------------------------------------------------------
// api\v1\routes\book.router.ts
--------------------------------------------------------------------------------
import { Router } from "express";
import { 
getFavoriteBooksHandler,
changeBookGenreHandler,

} from "../controllers/book.controller";

const router = Router();



 router.get("/favorites", getFavoriteBooksHandler);
 router.patch("/:bookId/genre",changeBookGenreHandler)



export default router;