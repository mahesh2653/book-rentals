import BookModel from "../model/book.model";
import { IBook } from "../type";

export class BookService {
  static async createBook(bookData: Partial<IBook>): Promise<IBook> {
    try {
      const book = await BookModel.create(bookData);
      return book;
    } catch (error) {
      throw new Error(`Failed to create book: ${(error as Error).message}`);
    }
  }

  static async getBooks(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    books: IBook[];
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const query = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { author: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const books = await BookModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await BookModel.countDocuments(query);

      return {
        books,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new Error(`Failed to fetch books: ${(error as Error).message}`);
    }
  }

  static async getBookById(bookId: string): Promise<IBook | null> {
    try {
      const book = await BookModel.findById(bookId);
      if (!book) throw new Error("Book not found");
      return book;
    } catch (error) {
      throw new Error(`Failed to fetch book: ${(error as Error).message}`);
    }
  }

  static async updateBook(
    bookId: string,
    bookData: Partial<IBook>
  ): Promise<IBook | null> {
    try {
      const book = await BookModel.findByIdAndUpdate(
        bookId,
        { $set: bookData },
        { new: true, runValidators: true }
      );
      if (!book) throw new Error("Book not found");
      return book;
    } catch (error) {
      throw new Error(`Failed to update book: ${(error as Error).message}`);
    }
  }

  static async deleteBook(bookId: string): Promise<void> {
    try {
      const book = await BookModel.findByIdAndDelete(bookId);
      if (!book) throw new Error("Book not found");
    } catch (error) {
      throw new Error(`Failed to delete book: ${(error as Error).message}`);
    }
  }
}
