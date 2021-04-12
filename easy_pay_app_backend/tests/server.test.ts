import { expect } from 'chai';
import { app, address } from '../index';
import  request from 'supertest';
import { IRequestOrder } from '../src/controller/order/iorder';
import { Currency } from '../src/helper/currency';
describe('Test Server', () => {
    it('should run server on specified port', ()=>{
        expect(address.port).equals(process.env.PORT || 8000);
    });
    it('should get response from GET /', async()=>{
        const resp = await request(app).get('/');
        expect(resp.status).to.equal(200);
        expect(resp.body).instanceOf(Object);
    });
    it('should post orders through V1 API /orders', async()=>{
        const resp = await request(app).post('/api/v1/orders').send({
            price: 200,
            customerFullName: 'Shivam Verma',
            currency: 'USD'
        } as IRequestOrder);
        expect(resp.status).to.equal(200);
        expect(resp.body).instanceOf(Object);
        expect(resp.body.price).to.equal(200);
        expect(resp.body.customerFullName).to.equal('Shivam Verma');
        expect(resp.body.currency).to.equal(Currency.USD);


    });

    it('should not post orders with invalid payload', async()=>{
        const resp = await request(app).post('/api/v1/orders').send({
            price: -1,
            customerFullName: 'Shivam Verma',
            currency: 'USD'
        } as IRequestOrder);
        expect(resp.status).to.equal(400);

    });

    it('should not post orders with no payload', async()=>{
        const resp = await request(app).post('/api/v1/orders');
        expect(resp.status).to.equal(400);

    });
});