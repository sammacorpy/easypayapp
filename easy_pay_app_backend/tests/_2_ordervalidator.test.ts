import { expect } from 'chai';
import { Validator } from '../src/helper/validator';

describe('Order Validator', ()=>{
    it('should validate Order', ()=>{
        const isValid = Validator.validateOrders( {
            price: 4300 ,
            currency: 'AUD',
            customerFullName: 'Shivam Verma'
        });
        expect(isValid).to.equal(true);
    });
    it('Should not have negative price', () => {
        const isValid = Validator.validateOrders({
            price: -1 ,
            currency: 'USD',
            customerFullName: 'Shivam Verma'
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have empty customer Name', () => {
        const isValid = Validator.validateOrders({
            price: 400 ,
            currency: 'USD',
            customerFullName: ''
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have currency other than listed', () => {
        const isValid = Validator.validateOrders({
            price: 100 ,
            currency: 'SSS',
            customerFullName: 'Shivam Verma'
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have negative price and empty customer Name', () => {
        const isValid = Validator.validateOrders({
            price: -1 ,
            currency: 'SGD',
            customerFullName: ''
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have negative price and invalid Currency', () => {
        const isValid = Validator.validateOrders({
            price: -1 ,
            currency: 'SSS',
            customerFullName: 'Shivam Verma'
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have empty customer name and invalid Currency', () => {
        const isValid = Validator.validateOrders({
            price: 100 ,
            currency: 'SSS',
            customerFullName: ''
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have negative price and empty Customer Name and Invalid Currency', () => {
        const isValid = Validator.validateOrders({
            price: -1 ,
            currency: 'SSS',
            customerFullName: ''
        });
        expect(isValid).to.equal(false);
    });
    it('Should must contain price value greater than 0', () => {
        const isValid = Validator.validateOrders({
            price: 0 ,
            currency: 'SGD',
            customerFullName: 'Shivam'
        });
        expect(isValid).to.equal(false);
    });

    it('Should not have price field missing', () => {
        const isValid = Validator.validateOrders({
            price: undefined ,
            currency: 'SGD',
            customerFullName: 'Shivam'
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have currency Field missing', () => {
        const isValid = Validator.validateOrders({
            price: 10 ,
            currency: undefined,
            customerFullName: 'Shivam'
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have customer name field missing', () => {
        const isValid = Validator.validateOrders({
            price: 120 ,
            currency: 'SGD',
            customerFullName: undefined
        });
        expect(isValid).to.equal(false);
    });
    it('Should not have invalid currency format', () => {
        const isValid = Validator.validateOrders({
            price: 120 ,
            currency: '1',
            customerFullName: 'Shivam verma'
        });
        expect(isValid).to.equal(false);
    });
});