// generic interfaces to facilitate addition of additional payment gateway using adapter design pattern

export interface PaymentPayload {
    amount?: string;
    orderId: string;
    creditCard: {
        number: string,
        expirationMonth: string,
        expirationYear: string,
        cvv: string,
        type?: string
    };
    currency?: string;
}

export interface PaymentResponse {
    success: boolean;
    transaction: {
        orderId?: string
    };
}

export interface PaymentError {
    success: boolean;
    error: any;
}
export interface PaymentGateway{
    payWithCreditCard(payload: PaymentPayload):Promise<Partial<PaymentResponse> & Partial<PaymentError>>;
}