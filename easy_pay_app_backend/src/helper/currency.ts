export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    THB = 'THB',
    HKD = 'HKD',
    SGD = 'SGD',
    AUD = 'AUD'
}

export type TCurrency = 'USD' | 'EUR' | 'THB' | 'HKD' | 'SGD' | 'AUD';

export const getCurrency = (currency: TCurrency): Currency => {
    switch(currency){
        case 'USD':
            return Currency.USD;
        case 'EUR':
            return Currency.EUR;
        case 'THB':
            return Currency.THB;
        case 'HKD':
            return Currency.HKD;
        case 'SGD':
            return Currency.SGD;
        case 'AUD':
            return Currency.AUD;
        default:
            return null;
    }
};

export const isValidCurrency = (currency: TCurrency) => {
    return getCurrency(currency)!==null;
};