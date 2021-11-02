import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './db/connect';
import routes from './routes';
import log from './logger';
import { deserializeUser } from './middleware';

const port = config.get('port') as number;
const host = config.get('host') as string;
const clientUri = config.get('clientUri') as string;

const app = express();
app.use(cors({ origin: clientUri, credentials: true }));
app.use(cookieParser());
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);
  dbConnect();
  routes(app);
});
