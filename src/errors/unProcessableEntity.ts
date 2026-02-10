import { StatusCodes } from "http-status-codes";
import { libraryError } from "./libraryError";

export class UnprocessableEntityError extends libraryError {
  constructor(details: string) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, "Unprocessable Entity", details);
  }
} 