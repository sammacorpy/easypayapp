import { Request, Response } from 'express';
import { findById } from '../../helper/crud';
import { Order } from '../../models/order';
import braintree from './braintree';
import { PaymentGateway } from './ipayments';
import paypal from './paypal';

export class PaymentsController {

    public static makePayment(req: Request, resp: Response) {

        // find order details from db with given orderId
        findById<Order>('orders', req.body.orderId)

        // if order is already paid respond back to user with order already palced message
        .then(order => order.isPaid === 1 as any ? Promise.reject({error: 1, msg: 'Order was already paid and placed'}) : order)

        // decide which payment getway to use based on request body parameter
        .then(order => {
            let gateway: PaymentGateway = braintree;
            if ((req.body.creditCard.type as string).toLowerCase() === 'amex' && order.currency !== 'USD') {
                return Promise.reject({error: 1, msg: 'AMEX is possible to use only for USD'});
            }
            else if (order.currency === 'USD' || order.currency === 'EUR' || order.currency === 'AUD') {
                gateway = paypal;
            }
            return {gateway, order};
        })

        // make payment with the chosen gateway (paypal | braintree)
        .then(({gateway, order}) => gateway.payWithCreditCard(
            {
                orderId: order.id,
                amount: order.price.toString(),
                creditCard: {...req.body.creditCard},
                currency: order.currency
            })
        )

        // check payment repsonse and then update order paid status in db
        .then(async paymentResp => paymentResp.success ?
            Order.updateOrderPaidStatus(paymentResp.transaction.orderId, paymentResp.success) :
            Promise.reject({error: 1, msg: 'payment failed', paymentStatus: paymentResp} ))

        // send feedback to user with order placed successfully
        .then (orderStatus => resp.send({error:0, orderStatus, msg: 'Order placed successfully'}))
        .catch(err => resp.status(500).send(err));
    }
}