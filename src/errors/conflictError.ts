import { StatusCodes } from "http-status-codes";
import { libraryError } from "./libraryError";

export class ConflictError extends libraryError {
  constructor(details: string) {
    super(StatusCodes.CONFLICT, "Conflict", details);
  }
}