import cors from "cors";
import express from "express";
import { myDataSource } from "./connection/data-source";
import logger from "./logger/logger";
import { loggerMiddleware } from "./middleware/logger.middleware";
import readerRouter from "./routers/reader.router"
// import bookRouter from "./routers/book.router";
import { errorHandler } from "./middleware/errorHandler.middleware";
import bookRouter from "./api/v1/routers/book.router"

import bookRouterV2 from "./api/v2/routers/book.router"
myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    app.use(cors())
    app.use(express.json());
    
    app.use(loggerMiddleware);
    app.use("/readers", readerRouter); 
    app.use("/books", bookRouter)
    
    app.use("/v2/books", bookRouterV2)

    app.use(errorHandler);
    const port = 3000;
   
    app.listen(port, () => {
      logger.info(`Server started on port: ${port}`)
    });
  })
  .catch((error) => logger.error(error));
