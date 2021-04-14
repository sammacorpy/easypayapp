import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index';
import { IRequestOrder } from '../src/controller/order/iorder';
import { PaymentPayload } from '../src/controller/payments/ipayments';
import { Currency } from '../src/helper/currency';

const data = {} as any;
const getOrderIdHavingCurrency = (currency = 'USD') => {
    return Object.keys(data).filter(key => data[key].currency === 'USD');
};

const generateData = async (currency = 'USD') => {
    const names = ['Shivam Verma', 'Samarth Rai', 'Raghav Thakur', 'Alpha Romeo', 'Beta Game', 'Bill Gates'];
    return await request(app).post('/api/v1/orders').send({
        price: (Math.round(1 + (Math.random() * 200) * 100) / 100),
        customerFullName: names[(Math.round(Math.floor(Math.random() * 6)))],
        currency
    } as IRequestOrder);
};


describe('Test Payment API services', () => {

    // postive unit test cases.......
    it('Should be able to do payments with ( USD | Paypal | Non Amex card )', async () => {
        const orderId = (await generateData('USD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;
        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143243442443',
                name: 'Shivam',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'

            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;

    });

    it('Should be able to do payments with ( EUR | Paypal | non Amex card )', async () => {
        const orderId = (await generateData('EUR')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143243442443',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });

    it('Should be able to do payments with ( AUD | Paypal | non Amex card )', async () => {
        const orderId = (await generateData('AUD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143243442443',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });

    it('Should be able to do payments with ( THB | braintree | non Amex card )', async () => {
        const orderId = (await generateData('THB')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4111111111111111',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2023'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });

    it('Should be able to do payments with ( HKD | braintree | non Amex card )', async () => {
        const orderId = (await generateData('HKD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4111111111111111',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2023'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });

    it('Should be able to do payments with ( SGD | braintree | non Amex card )', async () => {
        const orderId = (await generateData('SGD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4111111111111111',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2023'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });

    it('Should be able to do payments with ( USD | Paypal | Amex card )', async () => {
        const orderId = (await generateData('USD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '370016772802722',
                name: 'Shivam Verma',
                type: 'Amex',
                cvv: '7620',
                expirationMonth: '04',
                expirationYear: '2023'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');
        return resp;
    });


    // miscelenious case
    it('Should not be able to do re payments', async () => {
        const orderId = (await generateData('EUR')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;

        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143243442443',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'
            }
        } as PaymentPayload);
        expect(resp.status).to.equal(200);
        expect(resp.body?.msg).to.equals('Order placed successfully');

        const resp2 = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143243442443',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'
            }
        } as PaymentPayload);
        expect(resp2.status).to.equal(500);
        expect(resp2.body?.msg).to.equals('Order was already paid and placed');
        return resp2;
    });

    it('Should not be able to do payments with ( non USD | Paypal | Amex card )', async () => {
        const currencies = ['EUR', 'THB', 'HKD', 'SGD', 'AUD'];

        return Promise.all(currencies.map(async currency => {
            const orderId = (await generateData(currency)).body.id;

            // tslint:disable-next-line: no-unused-expression
            expect(orderId).not.null;
            let resp;
            resp = await request(app).post('/api/v1/payments').send({
                orderId,
                creditCard: {
                    number: '370016772802722',
                    name: 'Shivam Verma',
                    type: 'Amex',
                    cvv: '7620',
                    expirationMonth: '04',
                    expirationYear: '2023'
                }
            } as PaymentPayload);
            expect(resp.status).to.equal(500);
            expect(resp.body?.msg).to.equals('AMEX is possible to use only for USD');
            return resp;
        }));
    });

    it('Should throw 400 bad request with invalid format payment payload', async () => {
        const orderId = (await generateData('USD')).body.id;

        // tslint:disable-next-line: no-unused-expression
        expect(orderId).not.null;
        let resp;
        resp = await request(app).post('/api/v1/payments').send({
            orderId,
            creditCard: {
                number: '4014143442443',
                name: 'Shivam Verma',
                type: 'Visa',
                cvv: '123',
                expirationMonth: '01',
                expirationYear: '2022'

            }
        } as PaymentPayload);
        expect(resp.status).to.equal(400);
        return resp;

    });



});