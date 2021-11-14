import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import { getProducts, deleteProduct } from './helper/adminapicall';





const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data?.err){
               console.log(data.error)
            }else{
                preload();
            }
        })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      {/* <h2 className="mb-4">All products:</h2> */}
      <div className="row text-dark">
        <div className="col-12">
          <h2 className="text-center my-3 p-4 alert alert-dark">Delete and Update products</h2>
          <div className="card-columns">
           {products.map((product, index) =>{
          return (
          /* <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
          <h3 className="text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                Update
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                  deleteThisProduct(product._id);
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
            </div>  */

            <div className="card"  key={index}>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link
                    className="btn btn-success m-2"
                    to={`/admin/product/update/${product._id}`}
                  >
                    Update
                  </Link>
                  <button onClick={() => {
                      deleteThisProduct(product._id);
                  }} className="btn btn-danger m-2">
                    Delete
                  </button>
                </div>
              </div>

            )
        })}
        </div>
        </div>
      </div>
    </Base>

    )
}

export default ManageProducts;
