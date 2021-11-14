import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import { updateUser, getUser } from './helper/userapicalls';


const UpdateProfile = ({match})  => {
    const {user, token} = isAuthenticated();
    const userId = user._id;
    // console.log(userId)

    const [values, setValues] = useState({
      name: "",
      email : "",
      loading: false,
      error: "",
      success: "",
      getRedirect : false,
      formData : ""
  });

    const {name, email, createdProduct, getRedirect, formData} = values;

    const preload = (userId) => {
      // console.log(userId);
      getUser(userId, token).then(data => {
          console.log(data);
          if(data?.error){
              setValues({...values, error: data.error})
          }else{
              setValues({
                  ...values,
                  name: data.name,
                  email: data.email,
                  fromData: new FormData()
                  
              });
          }
      });
  };

  useEffect(() => {
    preload(userId);
}, []);

    const CurrentInfo = () => {
        return(
            <div className="card mb-4 p-4 m-4">
                <h4 className="card-header bg-dark text-white">
                    Current user Information
                </h4>
                <ul className="list-group text-left text-dark">
                    <li className="list-group-item">
                        <span className="badge badge-success badge-large mr-2">
                            Name :
                        </span>{values.name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success badge-large mr-2">
                            Email :
                        </span>{values.email}
                    </li>
                </ul>      
            </div>
        )
    }


    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value, formData})
  };
      const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"", loading: true});
        // console.log(values)
        updateUser(user._id, token, {name, email}).then(
          data =>{
            if(data?.error){
              setValues({...values, error: data.error})
            }else{
              setValues({
                ...values,
                name:"",
                email:"",
                loading: false,
              })
              console.log(values.error)
            }
          }
        )
    }


    const updateProductForm = () => (
        <form className="card mb-4 p-4 m-4" >
          
          <div className="form-group">
          <h4 className="card-header bg-dark text-white">
                    Update Information here
                </h4>
                <span className="mb-3 text-dark">Change name and email of user here</span>
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
            <input
              onChange={handleChange("email")}
              name="photo"
              className="form-control"
              placeholder="Email"
              value={email}
            />
        </div>
          <button type="submit" onClick={onSubmit} className="btn btn-block  btn-success">
          <Link to="/user/dashboard" className="btn text-light" >
            Update
          </Link>
          </button>
        </form>
      );


    

    return (
        <Base title="Update profile"
        description="Welcome to profile update section"
        className="container p-4"
        >
        <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">
          User Home
        </Link>
        <div className="row text-white rounded">
          <div className="col-md-8 offset-md-2">
            {CurrentInfo()}
            {updateProductForm()}
          </div>
        </div>
            
        </Base>
    )
}

export default UpdateProfile;