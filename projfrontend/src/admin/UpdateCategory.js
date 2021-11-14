import React, {useEffect, useState} from 'react'
import Base from '../core/Base';
import { Link} from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategory, updateCategory } from './helper/adminapicall';



const UpdateCategory = ({match}) => {
    const {user, token} = isAuthenticated()
    

    const [values, setValues] = useState({
        name: "",
        error: false,
        createdProduct: "",
        formData : ""
    });

    const {name, error, createdProduct, formData} = values;

    const preload = categoryId => {
        
        getCategory(categoryId).then(data => {
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error })
            }else{
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    fromData: new FormData()
                    
                });
            }
        });
    };
    
    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value, formData})
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
      <h5> {createdProduct} updated successfully. </h5>
    </div>

    ); 
    const warningMessage = () => (
     error && <div className="alert alert-success mt-3">
        <h5> Cannot be updated.</h5>
      </div>

    ); 

//TODO : Work on it.

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        updateCategory(match.params.categoryId , user._id, token, {name}).then(
          data =>{
            if(data?.error){
              setValues({...values, error: data.error})
            }else{
              setValues({
                ...values,
                name:"",
                createdProduct: data.name,
                error: false
              })
            }
          }
        )
    }



    const updateProductForm = () => (
        <form >
          <span className="mb-3">Add all the details related to product and upload image of product</span>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
        </div>
          <button type="submit" onClick={onSubmit} className="btn btn-success mb-3">
            Update Category
          </button>
        </form>
      );

    return (
        <Base title="Add a product here!"
        description="Welcome to product creation section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {updateProductForm()}
          </div>
        </div>
            
        </Base>
    )
}

export default UpdateCategory;
