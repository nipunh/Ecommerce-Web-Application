import React from 'react'
import Menu from './Menu';


const Base = ({
    className = "text-white p-4",
    children
}) => {
    return (
        
            <div className="">
                <Menu />
                 
                <div className="container-fluid">
                <div className = "text-black bg-white text-center ">
                    {/* <h3 className="display-4 ">{title}</h3>
                    <p className="lead mb-5">{description}</p> */}
                    <div className={className}>{children}</div>
                    </div>                
                
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-secondary text-white text-center py-3">
                    <h4> If you've any doubts feel free to ask!</h4>
                    <button type="button" className="btn btn-warning">Contact Us</button>
                </div>
            </footer>
        </div>
        </div>   
    )
}

export default Base; 