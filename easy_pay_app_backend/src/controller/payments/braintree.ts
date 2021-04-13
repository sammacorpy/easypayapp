import { PaymentError, PaymentGateway, PaymentPayload, PaymentResponse } from './ipayments';
import braintree, { Transaction, ValidatedResponse } from 'braintree';
import config from 'config';



class Braintree implements PaymentGateway{
    private gateway;
    private constructor() {
        this.gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
            merchantId: config.get('braintree.merchantID'),
            publicKey: config.get('braintree.publicKey'),
            privateKey: config.get('braintree.privateKey')
        });
    }
    public static getGateway(){
        const braintreeObj =  new Braintree();
        braintreeObj.gateway.config.timeout = 10000;
        return braintreeObj;
    }

    async payWithCreditCard(payload: PaymentPayload): Promise<Partial<PaymentResponse> & Partial<PaymentError>> {
        return await this.gateway.transaction.sale(
            {
                amount: payload.amount,
                orderId: payload.orderId,
                creditCard: {
                    number: payload.creditCard.number,
                    cvv: payload.creditCard.cvv,
                    expirationYear: payload.creditCard.expirationYear,
                    expirationMonth: payload.creditCard.expirationMonth
                }
            }
        );
    }

}

export default Braintree.getGateway();
