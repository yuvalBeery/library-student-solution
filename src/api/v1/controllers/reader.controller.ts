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
