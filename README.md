# easypayapp

## prerequisites
```
1. install node latest stable version
```

## Setup Backend
1.  clone this repository
    ```
    git clone https://github.com/sammacorpy/easypayapp.git
    ```

2.  change working directory to easy_pay_app_backend
    ```
    cd easy_pay_app_backend
    ```

3.  Install all dependencies
    ```
    npm install
    ```
<br>

## Unit test backend
run the below command to execute unit tests for backend
``` 
NODE_ENV=development app_paypal_secret_key=EHKYgtpUhFNMh7urlRGu4bn1eH6m9t4QXukqftWIHWZpiTrkvok-TYqZd6VWeBMplI74gEtKayG3o-Kw app_paypal_client_id=AZxTChUVvdic765_5w1jesXMjUCt83SwD2CYkRi62a5XfMV7XscLRqi1xHVn2yzqIBsirDkwri3k0rSP app_payment_private_key=e1cf3496be9eee408d25b3fe704c86db app_payment_public_key=4wymfm3855vfd9qs app_payment_merchent_id=8fbhjmh8nqppk8c9 npm test
```

<br>
<br>
<br>

## Setup Frontend

1.  change working directory into easy_pay_app_ui
    ```
    cd  easy_pay_app_ui
    ```

2.  Install all dependencies
    ```
    npm install
    ```
    


## Run Backend server
After unit testing backend
run
```
NODE_ENV=development app_paypal_secret_key=EHKYgtpUhFNMh7urlRGu4bn1eH6m9t4QXukqftWIHWZpiTrkvok-TYqZd6VWeBMplI74gEtKayG3o-Kw app_paypal_client_id=AZxTChUVvdic765_5w1jesXMjUCt83SwD2CYkRi62a5XfMV7XscLRqi1xHVn2yzqIBsirDkwri3k0rSP app_payment_private_key=e1cf3496be9eee408d25b3fe704c86db app_payment_public_key=4wymfm3855vfd9qs app_payment_merchent_id=8fbhjmh8nqppk8c9 npm start
```
> open this link http://localhost:8000 to verify if backend is running or not 

## Run frontend server
```
npm start
```
> visit UI by clicking on this link http://localhost:3000



# Resources
## some valid test credit cards to verify 

paypal visa card https://github.com/sammacorpy/easypayapp/blob/main/easy_pay_app_backend/tests/_5_paymentservice.test.ts#L34-L40
paypal Amex Card https://github.com/sammacorpy/easypayapp/blob/main/easy_pay_app_backend/tests/_5_paymentservice.test.ts#L174-L181
braintree test card https://github.com/sammacorpy/easypayapp/blob/main/easy_pay_app_backend/tests/_5_paymentservice.test.ts#L151-L158


