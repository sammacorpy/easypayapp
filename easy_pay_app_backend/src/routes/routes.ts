import { Response, Request, NextFunction } from 'express';
import { OrderController } from '../controller/order';
import { Validator } from '../helper/validator';
import { Router } from 'express';
export const routerV1 = Router();

// generic response for invalid data format
const validationErrorResponse = (validator: (data: any) => boolean) =>
    (req: Request, resp:Response, next: NextFunction) =>
        validator(req.body) === true ? next() : resp.sendStatus(400);


// register routes here ....
routerV1.post('/orders', [validationErrorResponse(Validator.validateOrders), OrderController.saveOrder]);
routerV1.get('/orders', OrderController.listOrders);




