import React, {useEffect, useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../admin/helper/adminapicall';
import "zingchart/es6";
import ZingChart from "zingchart-react";
// import { Form, Row, Col, Button, Spinner, Jumbotron } from 'react-bootstrap';



const AdminDashBoard = () => {

    const {user: {name, email, role}} = isAuthenticated();

    const [ orders, setOrder] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        getAllOrders(user._id, token).then(data=>{
            console.log(data)
            if(data?.error){
                console.log(data.error)
            }else{
                setOrder(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    function preventDefault(event) {
        event.preventDefault();
      }



    const [graphData, setGraphData] = useState( {
        type: "pie3d",
        plot: {
            borderColor: "#2B313B",
            borderWidth: 5,
            // slice: 90,
            valueBox: {
            placement: 'out',
            text: '%t\n%npv%',
            fontFamily: "Open Sans"
            },
            tooltip: {
            fontSize: '18',
            fontFamily: "Open Sans",
            padding: "5 10",
            text: "%npv%"
            },
            animation: {
            effect: 2,
            method: 5,
            speed: 900,
            sequence: 1,
            delay: 3000
            }
        },
        plotarea: {
            margin: "20 0 0 0"
        },
        series: [{
            values: [11.38],
            text: "New customers Joined",
            backgroundColor: '#51ADF5',
            detached: true
            },
            {
            values: [56.94],
            text: "New customer orders",
            backgroundColor: '#Fd7965',
            detached: true
            },
            {
                text: 'Customers Inactive',
                values: [9.69],
                backgroundColor: '#6877e5',
                detached: true
                },
            {
            values: [14.52],
            text: 'Old customer orders',
            backgroundColor: '#FFCB45',
            detached: true
            }
           
        ]
        })

    const adminLeft = () => {

        return(
            <div className="card mb-4 shadow">
            <h5 className="card-header bg-dark text-white">
                    Admin Navigation
                </h5>
                <ul className="list-group text-dark">
                    
                    {/* Category */}
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-info text-success">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-info text-success">
                            Manage Category
                        </Link>
                    </li>

                    {/* Product */}
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-info text-success">
                            Create New product
                        </Link>
                    </li>

                    {/* Manage */}
                    
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-info text-success">
                            Manage Products
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-info text-success">
                            Manage Orders
                        </Link>
                    </li>

                </ul>
            </div>
            
        )
    };
    const adminRight = () => {
        return(
            <div className="card mb-4 shadow">
                <h5 className="card-header bg-dark text-white">
                    Admin Information
                </h5>
                <ul className="list-group text-left text-dark">
                    <li className="list-group-item">
                        <span className="badge badge-success badge-large mr-2">
                            Name :
                        </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success badge-large mr-2">
                            Email :
                        </span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger badge-large mr-2">
                            Admin Privledges
                        </span>
                    </li>
                </ul>      
            </div>
            
            
        )
    }

    const adminGraphs = () => {
        return(
        <div className="card mb-4 shadow">
            <h5 className="card-header bg-dark text-white">
                Customer Interaction
            </h5>
            <ZingChart data={graphData} />
        </div>)

    }

    return (
        <Base title="Welcome Admin" description="Manage all products here" className="p-4">
            <h1>Dashboard</h1>
            <div className="row">
                <div className="col-lg-3 col-md-3 sm-12 my-2">
                    {adminLeft()}
            
                </div>
                <div className="col-lg-3 col-md-3 sm-12 my-2">
                    {adminRight()} 
                </div>
                <div className="col-lg-6 col-md-6 sm-12 my-2">
                    {adminGraphs()}
                </div>
            </div>
                   
        </Base>
    )
}


export default AdminDashBoard;