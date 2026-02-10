import { QueryFailedError, Repository } from "typeorm";
import { myDataSource } from "../connection/data-source";
import { Reader } from "../entities/Reader.entity";
import { NotFoundError } from "../errors/notFoundError";
import { PostgresErrors } from "../enums/postgresErrors.enum";

const readerRepository: Repository<Reader> = myDataSource.getRepository(Reader);

// Requirement 2: Create new reader
const createReader = async (readerData: Omit<Reader, "id">): Promise<Reader> => {
    try {
        return await readerRepository.save(readerData);
     } catch (error: unknown) {
        if (
        error instanceof QueryFailedError &&
        error.driverError.code === PostgresErrors.FOREIGN_KEY_VIOLATION
        ) {
            throw new NotFoundError("One or more favorite books not found" +
                " - please check that all book IDs exist");
        }
    }
};

export { createReader };