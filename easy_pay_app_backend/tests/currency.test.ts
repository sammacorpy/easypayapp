import { expect } from 'chai';
import { Currency, getCurrency, isValidCurrency } from '../src/currency';

describe('Currency', () => {
    it('Should get appropriate enum currency from the currency string', () => {
        expect(getCurrency('USD')).to.equals(Currency.USD);
        expect(getCurrency('AUD')).to.equals(Currency.AUD);
        expect(getCurrency('EUR')).to.equals(Currency.EUR);
        expect(getCurrency('HKD')).to.equals(Currency.HKD);
        expect(getCurrency('SGD')).to.equals(Currency.SGD);
        expect(getCurrency('THB')).to.equals(Currency.THB);
    });

    it('should only accept valid currency string', () => {
        expect(isValidCurrency('USD')).to.equals(true);
        expect(isValidCurrency('AUD')).to.equals(true);
        expect(isValidCurrency('EUR')).to.equals(true);
        expect(isValidCurrency('HKD')).to.equals(true);
        expect(isValidCurrency('SGD')).to.equals(true);
        expect(isValidCurrency('THB')).to.equals(true);
        // invalid string for currency
        expect(isValidCurrency('SSS' as any)).to.equals(false);
        expect(isValidCurrency('' as any)).to.equals(false);
        expect(isValidCurrency(undefined as any)).to.equals(false);
        expect(isValidCurrency(null as any)).to.equals(false);



    });
});