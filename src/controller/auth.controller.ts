import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await AuthService.signup(email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
