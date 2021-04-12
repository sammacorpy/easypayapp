import express from 'express';
import { routerV1 } from './src/routes/routes';
import morgan from 'morgan';
import cors from 'cors';
export const app = express();

// register middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


// Registering base routes to quickly verify if the API server is running or not
app.get('/', (req, resp)=> {
    resp.send({'msg': 'Welcome, Backend is up and running :)'});
});

// register router
app.use('/api/v1', routerV1);

// start http listener at port 8000 or $PORT
const port = process.env.PORT || 8000;
export const address = app.listen(port, ()=> {
    console.info(`Server started listening at port: ${port}`);
}).address() as any;
