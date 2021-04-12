import { Request, Response } from 'express';
import { isValidCurrency, TCurrency } from './currency';
import { IRequestOrder } from '../controller/order/iorder';

export class Validator{
    public static validateOrders(order: IRequestOrder): boolean {
        switch(true){
            case !order.price || order.price < 0:
            case !order.customerFullName || order.customerFullName === '':
            case !order.currency || !isValidCurrency(order.currency as TCurrency):
                return false;
            default:
                return true;
        }
    }
}