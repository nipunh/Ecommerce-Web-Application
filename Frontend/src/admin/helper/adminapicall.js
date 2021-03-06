import API from "../../backend";

//Category Calls
//1)Create Category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//2)Get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
//3) Delete a category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
//4) Update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json" ,
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
//5)Get a category
export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//Product calls
//1) Create a product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//2)Get products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//3)Delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//4)Get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}


//5)Update product details
export const updateProduct = (productId, userId, token, product) => {
    console.log(product);
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

//Get All orders
export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method: "GET",
        headers:{
        Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}