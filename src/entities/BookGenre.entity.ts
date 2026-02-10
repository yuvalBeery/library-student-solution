import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("book_genres")
export class BookGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (books) => books.genre)
  books: Book;
}
