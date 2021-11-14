import React from 'react'
import API from '../../backend';


const ImageHelper = ({product}) => {

   const imageurl = product ? `${API}/product/photo/${product._id}` : `https://img.icons8.com/clouds/100/000000/product.png` 

    return (
        <div>
            <div className="rounded border">
                <img
                  src={imageurl}
                  loading="lazy"
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="rounded"
                />
                
              </div>
        </div>
    )
}

export default ImageHelper;