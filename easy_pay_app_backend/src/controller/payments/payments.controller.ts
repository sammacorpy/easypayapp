import { Request, Response } from 'express';
import { findById } from '../../helper/crud';
import { Order } from '../../models/order';
import braintree from './braintree';
export class PaymentsController {
    public static makePayment(req: Request, resp: Response){
        findById<Order>('orders', req.body.orderId).
        then(order => order.isPaid === 1 as any ? null : order)
        .then(order => order ? braintree.payWithCreditCard(
            {
                orderId: order.id,
                amount: order.price.toString(),
                creditCard: {...req.body.creditCard}
            }) : null)
        .then(async paymentResp => paymentResp ? Order.updateOrderPaidStatus(paymentResp.transaction.orderId, paymentResp.success) : null)
        .then (orderStatus => orderStatus ?
            resp.send({error:0, orderStatus, msg: 'order placed successfully'})
            : resp.send({error:0, orderStatus: 1, msg: 'order was already paid and placed'}))
        .catch(err => resp.sendStatus(500));
    }
}