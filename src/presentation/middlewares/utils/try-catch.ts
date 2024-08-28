import { NextFunction, Request, Response } from "express";

type ControllerFunction = (req: Request, res: Response) => Promise<void>;
export const tryCatch =
  (fn: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
