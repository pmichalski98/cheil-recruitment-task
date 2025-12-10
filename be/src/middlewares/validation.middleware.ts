import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export function validateQuery<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as ParsedQs;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: `Validation failed: ${err.issues.length} error(s) in query params`,
          details: err.issues,
        });
      }
      next(err);
    }
  };
}
