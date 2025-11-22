import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      data: null,
    });
  }

  // fallback for unknown errors
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    statusCode: 500,
    data: null,
  });
};

export default globalErrorHandler;
