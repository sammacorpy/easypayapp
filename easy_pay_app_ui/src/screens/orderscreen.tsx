import {Button, FormControl, InputLabel, MenuItem, Select, TextField}  from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../services/api';

export const OrderScreen = ({match, history}: {match:any, history: any}) => {

    const [price, setPrice] = useState('' as any);
    const [currency, setCurrency] = useState('USD');
    const [customerFullName, setCustomerFullName] = useState('');
    const [error, setError] = useState('' as any)
    const [allOrders, setAllOrders] = useState([]);

    const createOrder = ()=> {
        setError('');
        API.post('orders',
            {
                price,
                customerFullName,
                currency
            }).then(resp => resp.status === 200 && resp.data.id &&
                history.push(`/payments/${resp.data.id}`)
            ).catch(err => setError(err.message));
        
    }
    useEffect(()=>{
        API.get('orders').then(resp => setAllOrders(resp.data.reverse()))
    },[])

    return <React.Fragment>
        <div className="content order-content">
            <div className="heading">
                Hey! Do you mind creating an order ...
            </div>
            {!!error ? <div className="errorbox">
                {error}
            </div>: ''}
            <div className="form-body">
                <form>
                    <TextField  error={price!==undefined && price<=0?true:false} 
                    type="number" 
                    id="outlined-required" 
                    label="Order Price" 
                    placeholder="Enter order price..."
                    value = {price}
                    onChange={(val)=>setPrice(!!val.target.value ? parseFloat(val.target.value) :'')} 
                    required={true}/>
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={currency}
                                onChange={(val)=>setCurrency(val.target.value as string)}
                                required={true}
                            >
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"EUR"}>EUR</MenuItem>
                                <MenuItem value={"THB"}>THB</MenuItem>
                                <MenuItem value={"HKD"}>HKD</MenuItem>
                                <MenuItem value={"SGD"}>SGD</MenuItem>
                                <MenuItem value={"AUD"}>AUD</MenuItem>

                            </Select>
                        </FormControl>
                    <TextField error={customerFullName.length<=0 || customerFullName.length >=24 ? true : false} id="outlined-required" label="Customer Full Name" placeholder="Enter Your Full Name" required={true} 
                        onChange={(val) => setCustomerFullName(val.target.value)}
                    />
                    <Button onClick={createOrder} variant="contained" color="primary">Create Order</Button>
                </form>
            </div>

            <h3 className="list-heading">All Orders here!!!</h3>
            <div className="previous-orders">

                {
                    allOrders.map((order: any)=><Link key={order.id} to={`/payments/${order.id}`}><pre>{JSON.stringify(order, null, 4)}</pre></Link>)
                }
            </div>
            
        </div>
    </React.Fragment>
}

