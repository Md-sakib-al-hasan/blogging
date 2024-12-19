import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';
//handlValdationErrro
const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const statusCode = StatusCodes.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
