//Error Details
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

//Error return type
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
