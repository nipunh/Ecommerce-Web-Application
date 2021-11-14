import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getCategories, createProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'



const AddProduct = () => {
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

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error })
            }else{
                setValues({...values, categories:data, formData: new FormData() })
                console.log("Cate:"+categories);
            }
        })
    };

    useEffect(() => {
        preload()
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
        <h5> {createdProduct} created successfully. </h5>
      </div>
    ); 

//TODO : Create error message, redirect user after few seconds on success.

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"", loading: true});
        createProduct(user._id, token, formData).then(
          data =>{
            if(data.err){
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



    const createProductForm = () => (
        <form >
          <h6 className="m-3">Add all the details related to product and upload image of product</h6>
          <div className="form-group">
            <label className="btn btn-block btn-secondary rounded">
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
            Create Product
          </button>
        </form>
      );

    return (
        <Base title="Add products" description="You can add new products to the store"
        className="container p-4 mt-5"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3"> Admin Dashboard</Link>
            <div
            className="p-4 row bg-dark text-white rounded shadow"
            >
                <div className="col-md-8 offset-md-2">
                 
                    {createProductForm()}
                     {successMessage()}

                </div>

            </div>
        </Base>
    )
}

export default AddProduct;