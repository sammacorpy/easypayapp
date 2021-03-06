

import { Request, Response } from 'express';
import { IRequestOrder, IResponseOrder } from './iorder';


import { Order } from '../../models/order';
import { findById, read } from '../../helper/crud';
export class OrderController{


    public static saveOrder(req: Request, resp: Response){
        const request = req.body as IRequestOrder;
        Order.createOrder(request.price, request.customerFullName, request.currency).then(order => resp.send(order))
        .catch(err => resp.sendStatus(500));
    }
    public static listOrders(req: Request, resp: Response){
        read('orders').then(orders => resp.send(orders)).catch(err => resp.sendStatus(500));
    }
    public static findOrderById(req: Request, resp: Response){
        findById<Order>('orders', req.params.id).then(orders => resp.send(orders)).catch(err => resp.sendStatus(500));
    }

}