import API from "../../backend";

//1) Update User Profile
export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json" ,
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}


//3)Get User Purchase List
export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
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
