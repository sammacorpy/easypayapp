import { expect } from 'chai';
import { app, address } from '../index';
import  request from 'supertest';
describe('Test Server', () => {
    it('should run server on specified port', ()=>{
        expect(address.port).equals(process.env.PORT || 8000);
    });
    it('should get response from GET /', async()=>{
        const resp = await request(app).get('/');
        expect(resp.status).to.equal(200);
        expect(resp.body).instanceOf(Object);
    });
});