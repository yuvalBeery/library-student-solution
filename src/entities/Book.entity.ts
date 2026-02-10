import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reader } from "./Reader.entity";
import { Borrow } from "./Borrow.entity";
import { BookGenre } from "./BookGenre.entity";
import { Author } from "./Author.entity";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Author, (author) => author.id)
  @JoinColumn([{ name: "author_id" }])
  author: Author;

  @ManyToOne(() => BookGenre, (genre) => genre.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "genre_id" }])
  genre: BookGenre;

  @ManyToMany(() => Reader, (reader) => reader.favoriteBooks, { onDelete: "CASCADE" })
  readers: Reader[];

  @OneToMany(() => Borrow, (borrows) => borrows.book)
  borrow: Borrow[];

  mostBorrowsAmount?: number;
}
