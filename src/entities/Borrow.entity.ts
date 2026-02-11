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
