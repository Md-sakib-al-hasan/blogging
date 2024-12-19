import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

//hanlde CastError
const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = StatusCodes.BAD_REQUEST;

  return {
    statusCode,
    message: 'CastError',
    errorSources,
  };
};

export default handleCastError;
