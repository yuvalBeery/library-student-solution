import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./library.error";

export class NotFoundError extends LibraryError {
  constructor(details: string) {
    super(StatusCodes.NOT_FOUND, "Not Found", details);
  }
} 