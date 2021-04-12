import { Request, Response } from 'express';
import { isValidCurrency } from './currency';
import { IRequestOrder } from './order/irequestorder';

export class Validator{
    public static validateOrders(order: IRequestOrder): boolean {
        switch(true){
            case !order.price || order.price < 0:
            case !order.customerFullName || order.customerFullName === '':
            case !order.currency || !isValidCurrency(order.currency as any):
                return false;
            default:
                return true;
        }
    }
}