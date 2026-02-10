import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const myDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  schema:'library',
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["./**/*.entity.ts"],
  logging: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
});
