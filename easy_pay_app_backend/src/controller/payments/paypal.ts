import { PaymentError, PaymentGateway, PaymentResponse as IPaymentResponse } from './ipayments';
import paypal, { CallbackFunction, Payment, QueryParameters, UpdateRequest, PaymentResponse } from 'paypal-rest-sdk';
import config from 'config';
import http from 'http';
import { PaymentPayload } from './ipayments';

// the given sdk doesn't have proper types so creating this to counter the same
interface IPaypal {
    payment: {
        create: (data: Payment,
            config: http.RequestOptions | CallbackFunction<PaymentResponse>,
            cb?: CallbackFunction<PaymentResponse>) => void
        execute: (id: string,
            data: paypal.payment.ExecuteRequest,
            config: http.RequestOptions | CallbackFunction<PaymentResponse>,
            cb?: CallbackFunction<PaymentResponse>) => void,
        get: (id: string,
            config: http.RequestOptions | CallbackFunction<PaymentResponse>,
            cb?: CallbackFunction<PaymentResponse>) => void,
        list: (data: QueryParameters | http.RequestOptions | CallbackFunction<paypal.payment.ListResponse>,
            config?: http.RequestOptions | CallbackFunction<paypal.payment.ListResponse>,
            cb?: CallbackFunction<paypal.payment.ListResponse>) => void,
        update: ( id: string,
            data: UpdateRequest[],
            config?: http.RequestOptions | CallbackFunction<PaymentResponse>,
            cb?: CallbackFunction<PaymentResponse>) => void;
    };
}


const transformToPaypalPayload = (payload: PaymentPayload): paypal.Payment => (
    {
        intent: 'sale',
        payer: {
            payment_method: 'credit_card',
            funding_instruments: [{
                credit_card: {
                    type: payload.creditCard.type,
                    number: payload.creditCard.number,
                    expire_month: payload.creditCard.expirationMonth,
                    expire_year: payload.creditCard.expirationYear,
                    cvv2: payload.creditCard.cvv,
                    first_name: payload.creditCard.name.split(' ')[0],
                    last_name: payload.creditCard.name.trim().split(' ').length>=2?payload.creditCard.name.split(' ').slice(1,).join(' '): ''
                }
            }]
        } as any,
        transactions: [{
            amount: {
                total: payload.amount,
                currency: payload.currency
            },
            description: 'Lorem Ipsum update this later'
        }]
    }
);

const responsePaymentStatus = (payload: PaymentPayload, success: boolean): IPaymentResponse =>({
    transaction: {
        orderId: payload.orderId,
    },
    success
});

class Paypal implements PaymentGateway{
    private gateway: IPaypal = {} as IPaypal;
    private constructor(){
        paypal.configure({
            mode: 'sandbox',
            client_id: config.get('paypal.clientID'),
            client_secret: config.get('paypal.secretKey'),
        });
        this.gateway.payment = paypal.payment;
    }

    public static getGateway(){
        return new Paypal();
    }

    async payWithCreditCard(payload: PaymentPayload): Promise<Partial<IPaymentResponse> & Partial<PaymentError>>{
        return new Promise((resolve, reject) => {
            this.gateway.payment.create(transformToPaypalPayload(payload), (error, payment) => {
                if (error) {
                    return reject({success: false, error});
                }
                if (payment.state === 'approved'){
                    return resolve(responsePaymentStatus(payload, true));
                }else {
                    return resolve(responsePaymentStatus(payload, false));
                }
            });
        });
    }

}

export default Paypal.getGateway();
