import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
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

  @ManyToOne(() => Book, (book) => book.borrow)
  book: Book[];
}
