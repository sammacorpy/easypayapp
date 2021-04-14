import { expect } from 'chai';
import { Validator } from '../src/helper/validator';

describe('Payment payload Validator', ()=>{

    /// all positive tests here...
    it('should validate valid payment payload with non amex card number', ()=>{
        const isValid = Validator.validatePaymentRequest( {
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'omega'
            }
        });
        expect(isValid).to.equal(true);
    });

    it('should validate valid payment payload with amex card number', ()=>{
        const isValid = Validator.validatePaymentRequest( {
            orderId: 'abc123',
            creditCard: {
                number: '411111111111111',
                cvv: '1234',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'omega'
            }
        });
        expect(isValid).to.equal(true);
    });

    // all negative test here...
    it('Should invalidate payment payload with invalid orderId ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);

        const isValid1 = Validator.validatePaymentRequest({
            orderId: undefined,
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid1).to.equal(false);
    });

    it('Should invalidate payment payload with invalid Credit card number ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '12345',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);

        const isValid1 = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '12345678910111212',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid1).to.equal(false);

        const isValid2 = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: undefined,
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid2).to.equal(false);
    });

    it('Should invalidate payment payload with invalid cvv ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '12',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);

        const isValid1 = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '12345',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid1).to.equal(false);

        const isValid2 = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: undefined,
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid2).to.equal(false);
    });

    it('Should invalidate payment payload with invalid expiration month ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'13',
                expirationYear: '2023',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);

        const isValid1 = Validator.validatePaymentRequest( {
            orderId: 'abc123',
            creditCard: {
                number: '411111111111111',
                cvv: '1234',
                expirationMonth:'-01',
                expirationYear: '2023',
                type: 'Amex',
                name: 'omega'
            }
        });
        expect(isValid1).to.equal(false);

        const isValid2 = Validator.validatePaymentRequest( {
            orderId: 'abc123',
            creditCard: {
                number: '411111111111111',
                cvv: '1234',
                expirationMonth:'',
                expirationYear: '2023',
                type: 'Amex',
                name: 'omega'
            }
        });
        expect(isValid2).to.equal(false);

        const isValid3 = Validator.validatePaymentRequest( {
            orderId: 'abc123',
            creditCard: {
                number: '411111111111111',
                cvv: '1234',
                expirationMonth: undefined,
                expirationYear: '2023',
                type: 'Amex',
                name: 'omega'
            }
        });
        expect(isValid3).to.equal(false);
    });

    it('Should invalidate payment payload with invalid expiration year ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2020',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);

        const isValid2 = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '202',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid2).to.equal(false);

        const isValid3 = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid3).to.equal(false);

        const isValid4 = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: undefined,
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid4).to.equal(false);

        const isValid5 = Validator.validatePaymentRequest({
            orderId: '',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '-2021',
                type: 'Amex',
                name: 'alpha'
            }
        });
        expect(isValid5).to.equal(false);
    });

    it('Should invalidate payment payload with invalid card type ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: '',
                name: 'alpha'
            }
        });
        expect(isValid).to.equal(false);


        const isValid1 = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: undefined,
                name: 'alpha'
            }
        });
        expect(isValid1).to.equal(false);
    });


    it('Should invalidate payment payload with invalid cardholder name ', () => {
        const isValid = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Visa',
                name: ''
            }
        });
        expect(isValid).to.equal(false);


        const isValid1 = Validator.validatePaymentRequest({
            orderId: 'abc123',
            creditCard: {
                number: '4111111111111111',
                cvv: '123',
                expirationMonth:'02',
                expirationYear: '2023',
                type: 'Visa',
                name: undefined
            }
        });
        expect(isValid1).to.equal(false);
    });
});