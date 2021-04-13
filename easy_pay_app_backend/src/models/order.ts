import { Currency, getCurrency, TCurrency } from '../helper/currency';
import {v4} from 'uuid';
import { IResponseOrder } from '../controller/order/iorder';
import { create, update } from '../helper/crud';

export class Order{
    id: string;
    price: number;
    customerFullName: string;
    currency: Currency;
    isPaid: boolean;
    private constructor(price: number, customerFullName: string, currency: string) {
        this.id = v4();
        this.price = price;
        this.customerFullName = customerFullName;
        this.currency = currency as Currency;
        this.isPaid = false;
    }
    public static async createOrder(price: number, customerFullName: string, currency: string): Promise<Order>{
        const order = new Order(price, customerFullName, currency);
        return create('orders', order);
    }
    public static async updateOrderPaidStatus(orderId:string, isPaid: boolean) {
        return await update<Order, 'isPaid'>('orders',orderId, {
            isPaid: true
        });
    }

}