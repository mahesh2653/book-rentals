import { IRental } from "../type";
import RentalModel from "../model/rental.model";
import BookModel from "../model/book.model";

export class RentalService {
  static async createRental(userId: string, bookId: string): Promise<IRental> {
    try {
      const existingRental = await RentalModel.findOne({
        userId,
        returnedAt: null,
      });
      if (existingRental) throw new Error("User already has a rented book");

      const book = await BookModel.findById(bookId);
      if (!book) throw new Error("Book not found");
      if (book.isRented) throw new Error("Book is already rented");

      const rental = await RentalModel.create({
        userId,
        bookId,
        rentedAt: new Date(),
      });

      await BookModel.findByIdAndUpdate(bookId, { isRented: true });

      return rental;
    } catch (error) {
      throw new Error(`Failed to create rental: ${(error as Error).message}`);
    }
  }

  static async getRentals(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    rentals: IRental[];
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const query = { userId };
      const rentals = await RentalModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("bookId");

      const total = await RentalModel.countDocuments(query);

      return {
        rentals,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new Error(`Failed to fetch rentals: ${(error as Error).message}`);
    }
  }

  static async getRentalById(
    rentalId: string,
    userId: string
  ): Promise<IRental | null> {
    try {
      const rental = await RentalModel.findOne({
        _id: rentalId,
        userId,
      }).populate("bookId");
      if (!rental) throw new Error("Rental not found");
      return rental;
    } catch (error) {
      throw new Error(`Failed to fetch rental: ${(error as Error).message}`);
    }
  }

  static async returnBook(
    rentalId: string,
    userId: string
  ): Promise<IRental | null> {
    try {
      const rental = await RentalModel.findOne({
        _id: rentalId,
        userId,
        returnedAt: null,
      });
      if (!rental) throw new Error("Active rental not found");

      const updatedRental = await RentalModel.findByIdAndUpdate(
        rentalId,
        { returnedAt: new Date() },
        { new: true }
      );
      await BookModel.findByIdAndUpdate(rental.bookId, { isRented: false });

      return updatedRental;
    } catch (error) {
      throw new Error(`Failed to return book: ${(error as Error).message}`);
    }
  }

  static async deleteRental(rentalId: string, userId: string): Promise<void> {
    try {
      const rental = await RentalModel.findOneAndDelete({
        _id: rentalId,
        userId,
        returnedAt: { $ne: null },
      });
      if (!rental) {
        throw new Error("Cannot delete active rental or rental not found");
      }
    } catch (error) {
      throw new Error(`Failed to delete rental: ${(error as Error).message}`);
    }
  }
}
