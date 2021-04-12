import { Currency } from '../../helper/currency';

export interface IRequestOrder {
    price: number;
    customerFullName: string;
    currency: string;
}

export interface IResponseOrder {
    id: string;
    currency: Currency;
    isPaid: boolean;
}
