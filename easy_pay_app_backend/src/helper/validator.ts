import { isValidCurrency, TCurrency } from './currency';
import { IRequestOrder } from '../controller/order/iorder';
import { PaymentPayload } from '../controller/payments/ipayments';

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

    public static validatePaymentRequest(paymentRequest: PaymentPayload){
        switch(true){
            case !paymentRequest.orderId:
            case !paymentRequest.creditCard || !paymentRequest.creditCard.cvv ||
                 !paymentRequest.creditCard.expirationMonth || !paymentRequest.creditCard.expirationYear ||
                 !paymentRequest.creditCard.number || !paymentRequest.creditCard.type:
            case paymentRequest.creditCard && paymentRequest.creditCard.cvv.length > 4 && paymentRequest.creditCard.cvv.length < 3:
            case paymentRequest.creditCard && !(paymentRequest.creditCard.number.length === 16 || paymentRequest.creditCard.number.length === 15):
            case paymentRequest.creditCard && paymentRequest.creditCard.expirationMonth.length !== 2:
            case paymentRequest.creditCard && paymentRequest.creditCard.expirationYear.length !== 4:
            case paymentRequest.creditCard && parseInt(paymentRequest.creditCard.expirationYear, 10) < 1900:
            case paymentRequest.creditCard && parseInt(paymentRequest.creditCard.expirationMonth, 10) < 0 &&
                 parseInt(paymentRequest.creditCard.expirationMonth, 10) > 12:
                return false;
            default:
                return true;
        }
    }
}