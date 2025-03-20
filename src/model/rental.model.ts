import mongoose, { Schema } from "mongoose";
import { IRental } from "../type";

const rentalSchema = new Schema<IRental>(
  {
    userId: { type: String, required: true, ref: "User" },
    bookId: { type: String, required: true, ref: "Book" },
    rentedAt: { type: Date, default: Date.now },
    returnedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const RentalModel = mongoose.model<IRental>("Rental", rentalSchema);

export default RentalModel;
