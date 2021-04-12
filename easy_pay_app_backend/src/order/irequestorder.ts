import { Currency } from '../currency';

export interface IRequestOrder {
    price: number;
    customerFullName: string;
    currency: string;

}