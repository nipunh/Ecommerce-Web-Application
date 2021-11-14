import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removefromCart, quantity } from './helper/cartHelper';


const Card = ({product, addtoCart = true, removeFromCart = false, quantity = false,
    setReload = f => f
    //function(f){return f}
    , 
    reload = undefined}) => {
    
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "Product"
    const cardDescription = product ? product.description : "About the product"
    const cardPrice = product ? product.price : "Unavailable"
  
  

    const addToCart = () => {
        addItemToCart(product, ()=> setRedirect(true) )
    }

    const getRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddtoCart = (addtoCart) => {
        return(
        addtoCart && (
            <button
            onClick={addToCart}
            className="btn btn-block rounded btn-outline-light mt-2 mb-2"
            >
            Add to Cart
          </button>
        )
        );
    }

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
      return(
        quantity && (
        <button
        onClick={() => {
          quantity(product._id);
            setReload(!reload);
        }}
        className="btn btn-success rounded  btn-sm px-4"
      >
        Quantity {product.count}
      </button>
    )
    );
  }

  
    
    return (
          <div className="card text-white bg-dark border border-dark shadow">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product}/>
              <p className="lead my-3 bg-secondary rounded font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-light rounded btn-sm px-4">{cardPrice} /- </p> <br />
              {showQuantity(quantity)}
              <div className="row">
                <div className="col-12" >
                    {showAddtoCart(addtoCart)}
                </div>
                <div className="col-12">
                    {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      
    return (
        <div>
            
        </div>
    )
}
 export default Card;