import React, {useEffect, useState} from 'react'
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';



const UpdateProduct = ({match}) => {
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock:"",
        photo : "",
        categories : [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect : false,
        formData : ""
    });

    const {name, stock, description, price, categories, category, createdProduct, getRedirect, formData} = values;

    const preload = productId => {
        console.log(productId);
        getProduct(productId).then(data => {
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error })
            }else{
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    fromData: new FormData()
                    
                });
            }
        });
    };
    
    const preloadCategories = () => {
       getCategories().then(data =>{
        if(data.error){
            setValues({...values, error: data.error })
        }else{
            setValues({
                categories: data,
                formData: new FormData()
            });
    }
});
}

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
        <h5> {createdProduct} updated successfully. </h5>
      </div>
    ); 

//TODO : Work on it.

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"", loading: true});
        
        updateProduct(match.params.productId , user._id, token, formData).then(
          data =>{
            if(data.error){
              setValues({...values, error: data.error})
            }else{
              setValues({
                ...values,
                name:"",
                description:"",
                price: "",
                photo: "",
                stock : "",
                loading: false,
                createdProduct: data.name
              })
            }
          }
        )
    }



    const updateProductForm = () => (
        <form >
          <span className="mb-3">Add all the details related to product and upload image of product</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              <option value="a">a</option>
              {categories && categories.map((cate, index)=>(
                  <option key={index} value={cate._id}>
                      {cate.name}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-success mb-3">
            Update Product
          </button>
        </form>
      );

    return (
        <Base title="Add a product here!"
        description="Welcome to product creation section"
        className="container p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded p-4">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {updateProductForm()}
          </div>
        </div>
            
        </Base>
    )
}

export default UpdateProduct;
