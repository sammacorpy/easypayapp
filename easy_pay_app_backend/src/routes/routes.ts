import { Response, Request, NextFunction } from 'express';
import { OrderController } from '../controller/order/order.controller';
import { Validator } from '../helper/validator';
import { Router } from 'express';
import { PaymentsController } from '../controller/payments/payments.controller';
export const routerV1 = Router();

// generic response for invalid data format
const validationErrorResponse = (validator: (data: any) => boolean) =>
    (req: Request, resp:Response, next: NextFunction) =>
        validator(req.body) === true ? next() : resp.sendStatus(400);


// register routes for orders here ....
routerV1.post('/orders', [validationErrorResponse(Validator.validateOrders), OrderController.saveOrder]);
routerV1.get('/orders', OrderController.listOrders);

// register routes for payments here .... TODO: seperate out both routes if it gets very long to manage (later)
routerV1.post('/payments', [validationErrorResponse(Validator.validatePaymentRequest), PaymentsController.makePayment]);

