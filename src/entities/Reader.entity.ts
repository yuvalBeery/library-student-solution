import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";
import { Borrow } from "./Borrow.entity";

@Entity("readers")
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Borrow, (borrows) => borrows.book)
  borrow: Borrow[];

  @ManyToMany(() => Book, (book) => book.readers, { onDelete: "CASCADE" })
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
  @JoinColumn([{ name: "favoriteBooks"}])
  favoriteBooks: Book[];
}
