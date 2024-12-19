/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

//handle DuplicatedError
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = StatusCodes.BAD_REQUEST;

  return {
    statusCode,
    message: 'Invalid email',
    errorSources,
  };
};

export default handleDuplicateError;
