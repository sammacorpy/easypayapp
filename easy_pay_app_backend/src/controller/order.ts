

import { Request, Response } from 'express';
import { IRequestOrder, IResponseOrder } from './order/iorder';


import { Order } from '../models/order';
import { read } from '../helper/crud';
export class OrderController{


    public static saveOrder(req: Request, resp: Response){
        const request = req.body as IRequestOrder;
        Order.createOrder(request.price, request.customerFullName, request.currency).then(order => resp.send(order))
        .catch(err => resp.sendStatus(500));
    }
    public static listOrders(req: Request, resp: Response){
        read().then(orders => resp.send(orders)).catch(err => resp.sendStatus(500));
    }

}