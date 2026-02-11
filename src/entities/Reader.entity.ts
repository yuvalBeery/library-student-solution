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
