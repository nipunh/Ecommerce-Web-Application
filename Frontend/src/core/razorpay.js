import React, {useEffect, useState} from 'react'
import "../styles.css"
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import API from '../backend';
import { isAuthenticated } from '../auth/helper';
import Razorpay from 'razorpay';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src 
        script.onload =() => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export default function razorpay() {
    
    const userId = isAuthenticated() && isAuthenticated().user._id

    async function displayRazorpay(){
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if(!res){
            alert('Payment gateway failure.')
            return
        }

        const data = await fetch (`${API}razorpay/${userId}`, {method: 'POST'}).then((response) => response.json()
        )
        console.log(data)

        var options = {
            "key": process.env.RAZORPAY_TEST_KEY , // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction"
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
    };
   


    return (
        <div>
            <br />
            <h4>RayzorPayment</h4>
            
        </div>
    )
}
