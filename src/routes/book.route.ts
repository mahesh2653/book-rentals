import { Router } from "express";
import { BookController } from "../controller/book.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const bookRouter = Router();

bookRouter.post(
  "/",
  authMiddleware,
  upload.single("coverImage"),
  BookController.createBook
);
bookRouter.get("/", authMiddleware, BookController.getBooks);
bookRouter.get("/:id", authMiddleware, BookController.getBook);
bookRouter.put(
  "/:id",
  authMiddleware,
  upload.single("coverImage"),
  BookController.updateBook
);
bookRouter.delete("/:id", authMiddleware, BookController.deleteBook);

export default bookRouter;
