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
