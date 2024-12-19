import { Response } from 'express';

type TResponsewithoutdata = {
  success: boolean;
  message?: string;
  statusCode: number;
};

const sendRequestWithData = (res: Response, data: TResponsewithoutdata) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  });
};

export default sendRequestWithData;
