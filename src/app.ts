import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorhandle from './app/middleWares/globalErrorhandle';
import notFound from './app/middleWares/notFound';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//application routes
app.use('/api', router);

//for testing purpose
// app.use('/', (req, res) => {
//   res.status(200).json({
//     message: 'Successfully woke server',
//   });
// });

// not found
app.use(notFound);

//globalErrorhandl
app.use(globalErrorhandle);
export default app;
