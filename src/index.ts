import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import routes from 'routes';

const app: Application = express();

console.log(process.env.NODE_ENV);

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.listen({ host: '0.0.0.0', port: 5000 });
