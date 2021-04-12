import { IRouter, Response, Request, NextFunction, response } from 'express';
import { Order } from './order/order';
import { Validator } from './validator';
export const routes = (app: IRouter) => {
    // app.get()
    app.get('/', (req, resp)=> {
        resp.send({'msg': 'Welcome, Backend is up and running :)'});
    });
    app.post('/orders',[validationErrorResponse(Validator.validateOrders), Order.createOrder]);
};


const validationErrorResponse = (validator: (data: any) => boolean) =>
    (req: Request, resp:Response, next:NextFunction) =>{
        if (validator(req.body)) {
            next();
        } else {
            resp.status(400);
        }

};