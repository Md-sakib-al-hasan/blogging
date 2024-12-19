import { JwtPayload } from 'jsonwebtoken';

// if used namespace show this error
// ES2015 module syntax is preferred over namespaces.eslint@typescript-eslint/no-namespace

//to extends Reqeust type
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
