import { Book } from "../entities/Book.entity";

export type FavBookDTO = Pick<Book, "id" >;
