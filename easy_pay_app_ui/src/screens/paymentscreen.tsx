import { TextField, Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { API } from "../services/api";


export const PaymentScreen = ({match, history}: {match:any, history: any}) => {
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [order, setOrder] = useState(undefined);
    const [error, setError] = useState('' as any)
    const [orderPaidStatus, setOrderPaidStatus] = useState(undefined)
    console.log("order status", orderPaidStatus)
    useEffect(()=>{
        API.get(`orders/${match.params.orderId}`).then(resp => setOrder(resp.data))
    },[match.params.orderId])

    const addGapsInCardNumber = (str: string, gapNo: number) =>{
        let newStr = ""
        if(str.length>=14) {
            newStr = str.length > 14 && str[14]===" " ? str: str + " ";
        } else if(str.length>=9) {
            newStr = str.length > 9 && str[9]===" " ? str: str + " ";
        } else if(str.length>=4) {
            newStr = str.length > 4 && str[4]===" " ? str: str + " ";
        } else {
            newStr = str;
        }
        return newStr;
    }

    const addSlash = (str: string) => {
        let newStr = ""
        if(str.length>2) {
            newStr = str[2]==="/" ? str : str.slice(0,2) + "/" + str.slice(2);
        } else {
            newStr = str;
        }
        return newStr;
    }

    // make payment and update UI
    const makePayment = () => {
        const cardnum = cardNumber.replaceAll(" ","").trim();
        setError('');
        API.post('payments', 
            {
                orderId: match.params.orderId,        
                creditCard: {
                    number: cardnum,
                    expirationMonth: cardExpiration.trim().split('/')[0].trim(),
                    expirationYear: cardExpiration.trim().split('/')[1].trim(),
                    cvv: cardCvv,
                    type: cardnum.length===15? "Amex": "Visa",
                    name: cardHolderName
                }
            }
        ).then(resp => {
            setOrderPaidStatus(resp.data.msg)
            
        }).catch(err => setError(err.response.data.msg || "Error, wrong card details please check again"))

    }

    return <React.Fragment>
        <div className="content order-content">
            <div className="heading">
                {order && (order as any).isPaid === 1 ?
                `Your Order is already placed with us` :
                orderPaidStatus || `Pay to place your order [${match.params.orderId}]`
                }
            </div>
            
            {!!error ? <div className="errorbox">
                {error}
            </div>: ''}

            {order && (order as any).isPaid === 1 ?
            <React.Fragment>
                <pre>{JSON.stringify(order, null, 4)}</pre>
                <Button onClick={()=>history.push("/orders")} className="actions" variant="contained" color="primary" >Back</Button>
            </React.Fragment>
            :
                <div className="form-body">
                    <form autoComplete="0">
                        <TextField error={cardHolderName.length<=0 || cardHolderName.length >=24 ? true : false} id="outlined-required" label="Cardholder Name" placeholder="Enter cardholder name..."
                            value={cardHolderName}
                            onChange={(val) => setCardHolderName(val.target.value)}
                            required={true} />
                        <TextField error={cardNumber.length<18 || cardNumber.length >19 ? true : false} id="outlined-required" label="Credit Card Number" placeholder="Enter credit card number..."
                            value={addGapsInCardNumber(cardNumber,4)}
                            onChange={(val) => setCardNumber(val.target.value)}
                            required={true} />
                        <TextField error={cardExpiration.length<=0 || cardExpiration.length >7 ? true : false} id="outlined-required" label="Expired On" placeholder="Enter expiry date..."
                            value={addSlash(cardExpiration)}
                            onChange={(val) => setCardExpiration(val.target.value)}
                            required={true} />
                        <TextField error={cardCvv.length<3 || cardCvv.length >4 ? true : false} id="outlined-required" label="CVV" placeholder="Enter CVV..."
                            value={cardCvv}
                            onChange={(val) => setCardCvv(val.target.value)}
                            required={true} />
                        <div>
                        <Button onClick={()=>history.push("/orders")} className="actions" variant="contained" color="primary" >Back</Button>
                        
                        <Button onClick={makePayment} className="actions" variant="contained" color="primary">Pay</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    </React.Fragment>
}