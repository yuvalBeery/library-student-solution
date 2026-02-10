import { IntegerType, QueryFailedError, Repository, UpdateResult } from "typeorm";
import { myDataSource } from "../../../connection/data-source";
import { Book } from "../../../entities/Book.entity";
import { NotFoundError } from "../../../errors/notFoundError";
import { PostgresErrors } from "../../../enums/postgresErrors.enum";

const bookRepository: Repository<Book> = myDataSource.getRepository(Book);

const getBookById = async (id: number): Promise<Book> => {
  const book = await bookRepository.findOne({
    where: { id : id },
    relations: ["genre"],
  });

  return book;
};

// Requirement 3: Update book
const updateBook = async (id: number, genreId: number): Promise<void> => {
 try {
    const book = await getBookById(id);
    book.genre.id = genreId;

    const updatedResult: UpdateResult = await bookRepository.update({ id }, book );
 } catch (error: unknown) {
    if (
    error instanceof QueryFailedError &&
    error.driverError.code === PostgresErrors.FOREIGN_KEY_VIOLATION
    ) {
        throw new NotFoundError(`The genre with id ${genreId} was not found`);
    } else {
        throw new NotFoundError("Book doesn't exist");
    }
}
};

// Requirement 1: Get the most borrow books
const getMostBorrowsBooks = async (): Promise<Book[]> => {
  // Gets the most borrow books amount and book 
  const result : Book =  await bookRepository
    .createQueryBuilder("books")
    .select()
    .addSelect("COUNT(books.id)", "mostBorrowsAmount")
    .innerJoin("books.borrow", "borrows")
    .leftJoinAndSelect("books.author", "authors")
    .leftJoinAndSelect("books.genre", "genre")
    .groupBy("books.id")
    .addGroupBy("authors.id")
    .addGroupBy("genre.id")
    .orderBy("COUNT(books.id)", "DESC")
    .getRawOne();

    // Getting many order by book name in case of a tie
    return await bookRepository
    .createQueryBuilder("books")
    .select()
    .innerJoin("books.borrow", "borrow")
    .leftJoinAndSelect("books.author", "authors")
    .leftJoinAndSelect("books.genre", "genre")
    .groupBy("books.id")
    .addGroupBy("authors.id")
    .addGroupBy("genre.id")
    .orderBy("books.name")
    .having("COUNT(books.id) = :mostBorrowsAmount", {mostBorrowsAmount: result.mostBorrowsAmount})
    .getMany(); 
};


export { updateBook, getMostBorrowsBooks};