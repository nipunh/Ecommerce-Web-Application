import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import API from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheckout = ({
    products, 
    setReload = f => f, 
    reload=undefined}) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price
        })
        return amount;
    };

    const makePayment = token => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("Response", response);
            console.log(token);
            const orderData = {
                products: products,
                transaction_id : token.id,
                amount: token.amount
            }
            const {status} = response;
            cartEmpty(()=>{
                console.log("Crashed")
            });
            setReload(!reload);

        }).catch(err => console.log(err))
    };

    const showStripeButton = () => {
        return isAuthenticated() ? (
           <StripeCheckoutButton
            stripeKey="pk_test_grfV4DAC8bGxOWKEkAcvTMtZ00fUTmtmD1"
            token={makePayment}
            amount = {getFinalPrice()* 100}
            name="Confirm payment"
            shippingAddress
            billingAddress
           >

           </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sigin to pay</button>
            </Link>
        )
    }

    

    return (
        <div>
            <h3>Total amount: {getFinalPrice()} -/</h3><br />
            <h4>Pay with Stripe</h4>
            {showStripeButton()}
            <br />
        </div>
    )
}
export default StripeCheckout;

