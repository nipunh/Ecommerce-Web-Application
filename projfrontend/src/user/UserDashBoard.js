import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getUser } from './helper/userapicalls';

const UserDashBoard = () => {
    const {user, token} = isAuthenticated()
    const UserId = user._id;

    const [values, setValues] = useState({
        userId: "",
        name: "",
        email: "",
        role : ""
    });

const preload = (UserId) => {
    getUser(UserId, token).then(data=>{
        if(data?.error){
            console.log(data.error)
        }else{
            setValues(data);
        }
    })
}

useEffect(() => {
    preload(UserId);
}, [])



const userLeft = () => {
    return(
        <div className="card">
        <div className="card-header bg-dark text-white">User Navigation</div>
            <ul className="list-group text-dark">
                
                {/* Order */}
                <li className="list-group-item">
                    <Link to="/user/ViewOrders" className="nav-link text-info text-success">
                        My Orders
                    </Link>
                </li>
                {/* Profile */}
                <li className="list-group-item">
                    <Link to="/user/updateProfile" className="nav-link text-info text-success">
                        Update Profile
                    </Link>
                </li>
                <l1>
                    
                </l1>
                {/* Product */}
                {/* <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-info text-success">
                        Update Profile
                    </Link>
                </li> */}

                {/* Manage */}
                
                {/* <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-info text-success">
                        Manage Products
                    </Link>
                </li> */}

                {/* <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link text-info text-success">
                        Manage Orders
                    </Link>
                </li> */}

            </ul>
        </div>
    )
};

const userRight = () => {
    
    return(
        <div className="card mb-4">
            <h4 className="card-header bg-dark text-white">
                User Information
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
                <li className="list-group-item">
                        { values.role === 1 ? 
                        <span className="badge badge-danger badge-large mr-2">User Type - Admin </span> : 
                        <span className="badge badge-danger badge-large mr-2">User Type - Customer </span>
                        }
                    
                </li>
            </ul>      
        </div>
        
        
    )
}


    return (
        <Base title="Profile" description="Manage orders and profile" className="container my-5 p-4">
           <div className="row">
                <div className="col-lg-3 col-md-auto sm-12 my-2">
                    {userLeft()}
            
                </div>
                <div className="col-lg-9 col-md-7 sm-12 my-2">
                    {userRight()} 
                </div>
            </div>
        </Base>
    )
}


export default UserDashBoard;