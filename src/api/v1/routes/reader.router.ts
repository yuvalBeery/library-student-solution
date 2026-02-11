import { Router } from "express";
import { 
createReaderHandler,

} from "../controllers/reader.controller";

const router = Router();



 router.post("/", createReaderHandler);



export default router;