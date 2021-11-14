import React, {useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import {createCategory} from "./helper/adminapicall"


const AddCategory = event => {
    
    const [name, setname] = useState("");

    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = event => {    
        setError("");
        setname(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //Backend Request
        createCategory(user._id, token, {name}).then(data => {
            if(data?.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setname("");
            }
        });
    }

    const successMessage = () => {
        if(success){
            return <h3 class="text-sucess"> Category created successfully.</h3>
        }
    }

    const errorMessage = () => {
        if(error){
            return <h3 class="text-warning">Failed to create category.</h3>
        }
    }

    const myCategoryForm = () => {
        return(        
        // <form>
        //     <div className="form-group bg-light text-dark mb-2">
        //         <p className="lable">Enter the new Category name</p>
        //         <input 
        //             type = "text"
        //             className="from-control my-2"
        //             onChange={handleChange}
        //             value={name}
        //             autoFocus
        //             required
        //             placeholder="For example: Tshirts"
        //         /><br />
        //         <button 
        //         className="btn btn-primary mb-2"
        //         onClick={onSubmit}
        //         >
        //             Create
        //         </button>
        //     </div>
        // </form>
        <div className="border shadow p-4 my-4 bg-dark text-white rounded shadow">
            <form className="form-inline offset-3">
                <label className="m-2" htmlFor="inlineFormCustomSelectPref"><h5>New Category Name</h5></label>
                <input type = "text"
                    className="form-control m-2"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required                     
                    id="inlineFormInputName2" 
                    placeholder="Summer Collection" />

                <button 
                type="submit"  onClick={onSubmit} className="btn btn-success my-1 rounded">Create</button>
            </form>
        </div>
        )
    }

    const goBack = () => (
        <div className="mt-5">
            <Link
                className="btn btn-small btn-dark mb-3"
                to="/admin/dashboard"
            >
                Admin Dashboard
            </Link>
        </div>
    )
    
    
    return (
        <Base className="container-fluid">
        <h1>Create Category</h1>
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {goBack()}
                {myCategoryForm()}
                
            </div>
        </Base>
    );
}
export default AddCategory;