
export const addItemToCart = (item, next) => {
    let cart = []
    let flag =0;
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.forEach(product => {
            
            if(product._id === item._id)
            {
                product.count += 1;
                flag =1;
            }
                    
        });
        if(flag === 1)
        {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
        else{
        cart.push({
            ...item,
            count : 1
        })
            localStorage.setItem("cart", JSON.stringify(cart))
        }
        // console.log(cart)
        next();
    }

}

export const loadCart = () => {
    if(typeof window != undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
};

export const removefromCart = (productId) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map ((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export const quantity = (productId) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map ((product, index) => {
            if(product._id === productId){
                product.count--;
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};


