import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getUser } from './helper/userapicalls';


const ViewOrders = () => {

    const [userdata, setuserdata] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        getUser(user._id, token).then(data=>{
            if(data?.error){
                console.log(data.error)
            }else{
                console.log(data)
                setuserdata(data.purchases);
            }
        })
    }
    useEffect(() => {
        preload();
    }, [])

    return (
        <Base title="My orders" description="Your all orders">
            <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
      </Link>
      {/* <h2 className="mb-4">All categories:</h2> */}
      <div className="row">
      {userdata.map((purchase, index) =>{
          return (
          <div key={index} className="row text-center mb-2 ">
               <div className="col-2">
              {index+1}
              </div>
              <div className="col-8">
            <h3 className="text-white text-left">{purchase.name}</h3>
            </div>
            <br />
            </div> 
            )})}
            </div>
        </Base>
    )
}

export default ViewOrders;
