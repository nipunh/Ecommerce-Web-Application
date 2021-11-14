import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper';
// import { Redirect } from 'react-router-dom';
import { addItemToCart, removefromCart } from './helper/cartHelper';


const CartCard = ({product, addtoCart = true, removeFromCart = false, quantity = false,
    setReload = f => f
    //function(f){return f}
    , 
    reload = undefined}) => {
    
    const [redirect, setRedirect] = useState(false)
    // const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "Product"
    // const cardDescription = product ? product.description : "About the product"
    const cardPrice = product ? product.price : "Unavailable"
  
  

    const addToCart = () => {
        addItemToCart(product, ()=> setRedirect(true) )
    }

    // const getRedirect = (redirect) => {
    //     if(redirect) {
    //         return <Redirect to="/cart" />
    //     }
    // }

    // const showAddtoCart = (addtoCart) => {
    //     return(
    //     addtoCart && (
    //         <button
    //         onClick={addToCart}
    //         className="btn btn-block btn-outline-success mt-2 mb-2"
    //         >
    //         Add to Cart
    //       </button>
    //     )
    //     );
    // }

    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
            <button
            onClick={() => {
                removefromCart(product._id);
                setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
        );
    }

    const showQuantity = (quantity) => {
      return( product.count);
  }

  
    
    return (
        <div className="row m-2 border py-2 rounded shadow-sm">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <ImageHelper className="mb-2" product={product} />
                <div className="mt-1">
                <span className="border px-2 float-center">Quantity : {showQuantity(quantity)}</span>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <h4 className="text-dark font-weight-bolder px-4"> {cardTitle} </h4>
                </div>
                <div className="row">
                    <p className="px-4">Price : ₹{cardPrice}</p>
                </div>
                
                <div className="row">
                    <p className="px-4">Total cost : ₹{product.price * product.count}  </p>
                </div>
                <div className="row">
                    <p className="px-4">{showRemoveFromCart(removeFromCart)} </p>
                </div>
            </div>
        </div>
        //   <div className="card text-white bg-dark border border-info ">
        //     <div className="card-header lead">{cardTitle}</div>
        //     <div className="card-body">
        //         {getRedirect(redirect)}
        //         <ImageHelper style={{ Height: "100px", Width: "100px" }}  product={product} />
        //       <p className="lead bg-success font-weight-normal text-wrap">
        //         {cardDescription}
        //       </p>
        //       <p className="btn btn-success rounded  btn-sm px-4">{cardPrice} /- </p> <br />
        //       {showQuantity(quantity)}
        //       <div className="row">
        //         <div className="col-12">
        //             {showAddtoCart(addtoCart)}
        //         </div>
        //         <div className="col-12">
        //             {showRemoveFromCart(removeFromCart)}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        );
      
}
 export default CartCard;