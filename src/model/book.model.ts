import mongoose, { Schema } from "mongoose";
import { IBook } from "../type";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    coverImage: { type: String },
    isRented: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
