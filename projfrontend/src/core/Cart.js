import React, {useEffect, useState} from 'react'
import "../styles.css"
import Base from './Base';
import CartCard from './CartCard';
import { loadCart} from './helper/cartHelper';
// import StripeCheckout from './StripeCheckout';
// import API from '../backend';
import Payment from './Payment';
// import { processPayment } from './helper/paymenthelper';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const Cart = () => {
    const userId = isAuthenticated() && isAuthenticated().user._id
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    console.log(userId)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = products => {
        console.log(products)
        return(
        <div>
            <h2 className="text-left">Cart({products.length})</h2>
            <div className="row">
                {products.map((product, index) => (
                    <CartCard 
                        key = {index}
                        product = {product}
                        addtoCart= {false}
                        quantity = {true}
                        removeFromCart = {true}
                        setReload = {setReload}
                        reload = {reload}
                    />
                 )
                 )
                }
            </div>
        </div>
        );
    };
    



    // const loadCheckout = () => {
    //     return(
    //     <div>
    //         <h2>
    //             Checkout Section
    //         </h2>
    //     </div>
    //     )
    // }



    
  
    return (
    <Base title="Cart" description="Ready to Checkout">
        <div className=" row text-dark my-2">
            <div className="col-lg-8 col-md-6 col-sm-8 mx-lg-3 mx-md-2 p-lg-4 border shadow my-2">
                {
                products ? 
                loadAllProducts(products)
                :
                <h3>The cart is empty</h3>
            }
           
            </div>
            <div className="col-lg-3 col-md-5 col-sm-3 mx-lg-4 mx-md-2 p-lg-4 border shadow my-2">
                {/* <StripeCheckout
                    products = {products}
                    setReload = {setReload}            
                /> */}
                 {
                    userId !== false ? <Payment
                    products = {products}
                    setReload = {setReload}            
                ></Payment>  : 
                    <Link to="/signin">
                        <button className="btn btn-warning my-4">Sigin to pay</button>
                    </Link>

                }
            </div>

        </div>
        </Base>
    )
}

export default Cart;