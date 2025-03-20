import { Router } from "express";
import { RentalController } from "../controller/rental.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const rentalRouter = Router();

rentalRouter.post("/", authMiddleware, RentalController.createRental);
rentalRouter.get("/", authMiddleware, RentalController.getRentals);
rentalRouter.get("/:id", authMiddleware, RentalController.getRental);
rentalRouter.put("/:id/return", authMiddleware, RentalController.returnBook);
rentalRouter.delete("/:id", authMiddleware, RentalController.deleteRental);

export default rentalRouter;
