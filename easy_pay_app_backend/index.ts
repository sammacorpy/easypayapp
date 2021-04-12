import express from 'express';
import { routes } from './src/routes';
import morgan from 'morgan';
export const app = express();

// register middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Register routes
routes(app);

const port = process.env.PORT || 8000;
export const address = app.listen(port, ()=> {
    console.info(`Server started listening at port: ${port}`);
}).address() as any;
