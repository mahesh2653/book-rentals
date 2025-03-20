export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  coverImage?: string;
  isRented: boolean;
  createdAt?: Date;
}

export interface IRental {
  _id?: string;
  userId: string;
  bookId: string;
  rentedAt: Date;
  returnedAt?: Date;
}

// src/types/index.ts
import { Request } from "express";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  coverImage?: string;
  isRented: boolean;
  createdAt?: Date;
}

export interface IRental {
  _id?: string;
  userId: string;
  bookId: string;
  rentedAt: Date;
  returnedAt?: Date;
}

// Extend Express Request type globally
declare module "express" {
  interface Request {
    user?: { id: string };
  }
}
