import { Request, Response } from "express";
import { RentalService } from "../services/rental.services";

export class RentalController {
  static async createRental(req: Request, res: Response) {
    try {
      const { bookId } = req.body;
      const userId = req.user?.id!;
      const rental = await RentalService.createRental(userId, bookId);
      res.status(201).json(rental);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getRentals(req: Request, res: Response) {
    try {
      const { page = "1", limit = "10" } = req.query;
      const userId = req.user?.id!;
      const result = await RentalService.getRentals(
        userId,
        Number(page),
        Number(limit)
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getRental(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      const rental = await RentalService.getRentalById(id, userId);
      res.json(rental);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async returnBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      const rental = await RentalService.returnBook(id, userId);
      res.json(rental);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteRental(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      await RentalService.deleteRental(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
