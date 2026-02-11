--------------------------------------------------------------------------------
// entities\Reader.entity.ts
--------------------------------------------------------------------------------
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Borrow } from "./Borrow.entity";
import { Book } from "./Book.entity";

@Entity("readers")
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Borrow, (borrow) => borrow.reader)
  borrows: Borrow[];


  
  @ManyToMany(() => Book, (book) => book.favoritedBy)
  @JoinTable({
    name: "favorite_books",
    joinColumn: {
      name: "reader_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
  })
  favoriteBooks: Book[];
}

--------------------------------------------------------------------------------
// entities\Borrow.entity.ts
--------------------------------------------------------------------------------
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Reader } from "./Reader.entity";
import { Book } from "./Book.entity";

@Entity("borrows")
export class Borrow {
  @PrimaryColumn()
  readerId: number;

  @PrimaryColumn()
  bookId: number;

  @Column()
  returnDeadline: Date;

  @Column()
  borrowDate: Date;

  @Column({ default: () => "false" })
  didReturn: boolean;

  @ManyToOne(() => Reader, (reader) => reader.borrows)
  @JoinColumn([{ name: "reader_id" }])
  reader: Reader;

  @ManyToOne(() => Book, (book) => book.borrows)
  @JoinColumn([{ name: "book_id" }])
  book: Book;
}

--------------------------------------------------------------------------------
// entities\BookGenre.entity.ts
--------------------------------------------------------------------------------
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("book_genres")
export class BookGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  book: Book[];
}

--------------------------------------------------------------------------------
// entities\Book.entity.ts
--------------------------------------------------------------------------------
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

--------------------------------------------------------------------------------
// entities\Author.entity.ts
--------------------------------------------------------------------------------
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  book: Book[];
}