import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message?: string;
  statusCode: number;
  data: T;
};

const sendRequest = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendRequest;
