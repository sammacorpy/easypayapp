import { PaymentGateway } from './payments';
import braintree from 'braintree';
import config from 'config';

export interface PaymentPayload {
    orderId: string;
    creditCard: {
        number: string,
        expirationMonth: string,
        expirationYear: string,
        cvv: string,
    };
}
class Braintree extends PaymentGateway<braintree.BraintreeGateway>{

    private constructor() {
        super();
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

    async payWithCreditCard(payload: PaymentPayload & {amount: string}) {
        return await this.gateway.transaction.sale(payload);
    }

}

const paymentAPI = Braintree.getGateway();
export default paymentAPI;