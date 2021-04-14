import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { OrderScreen } from './screens/orderscreen';
import { PaymentScreen } from './screens/paymentscreen';

import './App.css';

const App = () => 
<BrowserRouter>
  <Suspense fallback = {<div>Loading....</div>}>
    <Switch>
      <Route exact path='/orders' component={OrderScreen}></Route>
      <Route exact path='/payments/:orderId' component={PaymentScreen}></Route>
      <Redirect to="/orders"></Redirect>


    </Switch>  
  </Suspense>
</BrowserRouter>




export default App;
