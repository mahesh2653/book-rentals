import { Request, Response } from "express";
import { BookService } from "../services/book.services";

export class BookController {
  static async createBook(req: Request, res: Response) {
    try {
      const { title, author, isbn } = req.body;
      const coverImage = req.file?.path;
      const book = await BookService.createBook({
        title,
        author,
        isbn,
        coverImage,
      });
      res.status(201).json(book);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getBooks(req: Request, res: Response) {
    try {
      const { page = "1", limit = "10", search = "" } = req.query;
      const result = await BookService.getBooks(
        Number(page),
        Number(limit),
        String(search)
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await BookService.getBookById(id);
      res.json(book);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, author, isbn } = req.body;
      const coverImage = req.file?.path;
      const book = await BookService.updateBook(id, {
        title,
        author,
        isbn,
        coverImage,
      });
      res.json(book);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookService.deleteBook(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
