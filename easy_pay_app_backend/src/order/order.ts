
import { Currency, getCurrency, TCurrency} from '../currency';
import uuid from 'uuid';
import { Request, Response } from 'express';
import { IRequestOrder } from './irequestorder';


export class Order{
    private id: string;
    private price: number;
    private customerFullName: string;
    private currency: Currency;

    private constructor(price: number, customerFullName: string, currency: string) {
        this.id = uuid.v4();
        this.price = price;
        this.customerFullName = customerFullName;
        this.currency = getCurrency(currency as TCurrency);
    }

    public static createOrder(req: Request, resp: Response): void{
        const request = req.body as IRequestOrder;
        const orders = new Order(request.price, request.customerFullName, request.currency);
    }

    private saveOrder(order:Order) {
        // save order to database

    }


}