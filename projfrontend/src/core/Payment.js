import React, {useState, useEffect} from 'react'
import {  cartEmpty } from './helper/cartHelper';
import { getmeToken, processPayment } from './helper/paymenthelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";



const Payment = ( {products, setReload= f => f, reload = undefined}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            console.log("INFO:",info)
            if(info?.error){
                setInfo({...info, error: info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })

    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getAmount = () => {
        let amount =0;
        products.map(p => {
            amount = amount+ (p.price * p.count)
        })
        return amount;
    }
    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + (p.price * p.count)
        })
        return amount;
    };
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    PaymentMethodNonce: nonce,
                    amount : getAmount()
                };
                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({...info, success: response.success, loading:false})
                    console.log("Payment Success:", response)
                    const orderData = {
                        products: products,
                        transaction_id : response.transaction.id,
                        amount: response.transaction.amount,
                        status: response.transaction.status
                    }
                    console.log(orderData);
                    createOrder(userId, token, orderData);
                    cartEmpty(()=>{
                        console.log("Crashed")
                    });
                    setReload(!reload);
                }).catch(error =>
                    setInfo({loading: false, success: false}),                  
            )
            });      
    }

    const showbtdropIn = () => {
        return(
            <div>
                {
                info.clientToken !== null && products.length> 0 ? 
                <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={ instance => (info.instance = instance)}
                />
                <button className="btn btn-large btn-success" onClick={onPurchase}>Pay</button>
                </div>
                :
                <h3>
                    Cart is empty.
                </h3>    
                }
                
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-left">Price Detail</h2>
                    {
                        products ?
                        (
                            <div>
                            <div className="card my-3">
                                <ul className="list-group list-group-flush text-left">
                                    <li className="list-group-item m-1">
                                    Price({products.length} items) : ₹{getAmount()}
                                    </li>
                                    <li className="list-group-item m-1">Delivery Charges :  Free</li>
                                    <li className="list-group-item m-1"><strong>Total Amount : ₹{getAmount()}</strong></li>
                                </ul>
                            
                            </div>
                            <div className="my-3">
                            {showbtdropIn()}
                            </div>
                            </div>    
                        ) :
                        (
                            <div className="card my-3">
                                <strong>Cart Empty </strong> 
                            </div>
                        )
                    }
           </div>

    )
}

export default Payment;