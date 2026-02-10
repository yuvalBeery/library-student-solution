import { Router } from "express";
import { 
  updateBookHandler, getMostBorrowsBooksHandler
} from "../controllers/book.controller";

const router = Router();

router.patch("/:bookId/genre", updateBookHandler);
router.get("/favorites", getMostBorrowsBooksHandler);


export default router;