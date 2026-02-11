import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./library.error";

export class ConflictError extends LibraryError {
  constructor(details: string) {
    super(StatusCodes.CONFLICT, "Conflict", details);
  }
}