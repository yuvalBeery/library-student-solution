import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Borrow } from "./Borrow.entity";
import { Author } from "./Author.entity";
import { BookGenre } from "./BookGenre.entity";
import { Reader } from "./Reader.entity";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn([{ name: "author_id" }])
  author: Author;

  @ManyToOne(() => BookGenre, (bookGenre) => bookGenre.book)
  @JoinColumn([{ name: "genre_id" }])
  genre: BookGenre;

  @ManyToMany(() => Reader, (reader) => reader.favoriteBooks, { onDelete: "CASCADE" })
  favoritedBy: Reader[];
}
