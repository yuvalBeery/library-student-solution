import { StatusCodes } from "http-status-codes";
import { libraryError } from "./libraryError";

export class NotFoundError extends libraryError {
  constructor(details: string) {
    super(StatusCodes.NOT_FOUND, "Not Found", details);
  }
} 