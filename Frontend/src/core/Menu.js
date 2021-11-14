import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper';
import { Navbar, Nav , Button, Form, FormControl } from 'react-bootstrap';

const currTab = (history, path) => {
    if (history.location.pathname === path){
        return {color:"#2ecc"} ;
    }
    else{
        return {color:"#FFFFFF"};
    }
}

const Menu = ({history}) => (

    <div>
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">
      <img
       src={require('./logo.png')}
        width="30"
        height="30"
        className="d-inline-block align-top"
        
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link style={currTab(history, "/")} className="nav-link" href="/"> Home </Nav.Link>
      
      {isAuthenticated() && isAuthenticated().user.role === 0 && <Nav.Link style={currTab(history, "/user/dashboard")} 
                className="nav-link" 
                href="/user/dashboard">
                User Dashboard</Nav.Link>
        }  

      {isAuthenticated() && isAuthenticated().user.role === 1 && <Nav.Link style={currTab(history, "/admin/dashboard")} 
                className="nav-link" 
                href="/admin/dashboard">
                Admin Dashboard</Nav.Link>
        }     

       {!isAuthenticated() &&             
             <Fragment>
                 <Nav.Link style={currTab(history, "/signup")} className="nav-link" href="/signup"> SignUp</Nav.Link>
                <Nav.Link style={currTab(history, "/signin")} className="nav-link" href="/signin"> Login</Nav.Link>
             </Fragment>    
       }

        {isAuthenticated() && (
            <Nav.Link style={currTab(history, "/signOut")} 
                            className="nav-link"
                            onClick={()=>{
                                signout(() => {
                                    history.push("/")
                                })
                            }}
                        > 
                        SignOut</Nav.Link>
        )}
      
      <Nav.Link style={currTab(history, "/cart")} className="nav-link" href="/cart"> Cart</Nav.Link>
    </Nav>    
        <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    </div>
    // <div>
    //     <ul className="nav nav-tabs bg-dark p-3 ">
    //         <li className="nav-item ">
    //             <Link style={currTab(history, "/")} className="nav-link" to="/"> Home </Link>
    //         </li>
    //       {isAuthenticated() && isAuthenticated().user.role === 0 && (  <li className="nav-item">
    //             <Link 
    //             style={currTab(history, "/user/dashboard")} 
    //             className="nav-link" 
    //             to="/user/dashboard">
    //             User Dashboard
    //             </Link>
    //         </li>
    //         )}

    //         {isAuthenticated() && isAuthenticated().user.role === 1 && (
    //              <li className="nav-item">
    //              <Link 
    //              style={currTab(history, "/admin/dashboard")} 
    //              className="nav-link"
    //              to="/admin/dashboard"> 
    //              Admin Dashboard</Link>
    //          </li>
    //         )}
           

    //         {!isAuthenticated() &&             
    //         <Fragment>
    //         <li className="nav-item">
    //             <Link style={currTab(history, "/signup")} className="nav-link"to="/signup"> SignUp</Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link style={currTab(history, "/signin")} className="nav-link"to="/signin"> SignIn</Link>
    //         </li>
    //         </Fragment> }
           
    //         {isAuthenticated() && (
    //              <li className="nav-item">
    //             <span
    //                 style={currTab(history, "/signOut")} 
    //                 className="nav-link text-warning"
    //                 onClick={()=>{
    //                     signout(() => {
    //                         history.push("/")
    //                     })
    //                 }}
    //             > 
    //             SignOut</span>
    //         </li>
    //         )}

    //         <li className="nav-item">
    //             <Link style={currTab(history, "/cart")} className="nav-link"to="/cart"> Cart</Link>
    //         </li>
    //     </ul>
    // </div>


    
)

export default withRouter(Menu);
