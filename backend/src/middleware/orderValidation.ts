import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const orderValidation =
  () => (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
      items: z
        .array(
          z.object({
            id: z.string(),
            quantity: z
              .number({ error: "Quantity must be a number" })
              .min(1, "Item quantity must be greater than 0"),
          }),
        )
        .min(1, "At least one item is required"),

      customer: z.object({
        name: z.string().min(1, "Customer name is required"),
        email: z.string().email("Invalid email format"),
      }),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
