import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Book } from "../../../entities/Book.entity";
import { NotFoundError } from "../../../errors/notFoundError";
import { myDataSource } from "../../../connection/data-source";
import { BookGenre } from "../../../entities/BookGenre.entity";

const bookRepository: Repository<Book> = myDataSource.getRepository(Book);
const bookGenreRepository: Repository<BookGenre> =
  myDataSource.getRepository(BookGenre);

const getFavoriteBooks = async (): Promise<Book[]> => {
  const favBookCounter = await bookRepository
    .createQueryBuilder("book")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .select("COUNT(favoriteBooks.id)", "favAmount")
    .orderBy("COUNT(favoriteBooks.id)")
    .limit(1)
    .getRawOne();

  const result = await bookRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.author", "author")
    .leftJoinAndSelect("book.genre", "genre")
    .leftJoin("book.favoritedBy", "favoriteBooks")
    .groupBy("author.id")
    .addGroupBy("genre.id")
    .addGroupBy("book.id")
    .having("COUNT (favoriteBooks.id) = :favBookCounter", {
      favBookCounter: favBookCounter.favAmount,
    })
    .getMany();

  return result;
};

const getAllGenre = async (): Promise<BookGenre[]> => {
  return await bookGenreRepository.find();
};


const getAllBooks = async (): Promise<Book[]> => {
  return await bookRepository.find();
};

const verifyIdInTable = (ids: number[], givenId: number, error: string) => {
  if (!ids.find((id) => givenId === id)) {
    throw new NotFoundError(error);
  }
};

const getBookById = async (id: number): Promise<Book> => {
  const genre = await bookRepository.findOne({
    where: { id },
    relations: ["genre"],
  });

  if (!genre) {
    throw new NotFoundError("genre not found");
  }

  return genre;
};
const changeBookGenre = async (
  genreId: number,
  bookId: number,
): Promise<void> => {
  const genreIds = (await getAllGenre()).map((genre) => genre.id);
  verifyIdInTable(genreIds, genreId,`The genre with id ${genreId} was not found`);
  
  const bookIds = (await getAllBooks()).map((book) => book.id);
  verifyIdInTable(bookIds, bookId,`The book with id ${bookId} was not found`);
  
  const updatedBook = (await getBookById(bookId))
  updatedBook.genre.id = genreId;
  const updatedResult: UpdateResult = await bookRepository
  .update(bookId,updatedBook );

  if (updatedResult.affected === 0) {
    throw new NotFoundError("the genre was not updated");
  }
};

export { getFavoriteBooks, changeBookGenre, getAllBooks };
