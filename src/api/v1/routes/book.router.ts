import { Router } from "express";
import { 
getFavoriteBooksHandler,
changeBookGenreHandler,

} from "../controllers/book.controller";

const router = Router();



 router.get("/favorites", getFavoriteBooksHandler);
 router.patch("/:bookId/genre",changeBookGenreHandler)



export default router;