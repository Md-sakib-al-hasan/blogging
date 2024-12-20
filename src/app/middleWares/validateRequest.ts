import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

//Validation middleware
const ValidateRequest = (schma: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schma.parseAsync({
      body: req.body,
      params: req.params,
    });

    next();
  });
};

export default ValidateRequest;
