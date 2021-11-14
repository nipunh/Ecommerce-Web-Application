import API from "../../backend"

export const processPayment = (userId, paymentInfo) => {
    return fetch(`${API}/razorpay/${userId}`,{
        method: "POST",
        headers:{
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`  
        },
        body: JSON.stringify(paymentInfo)
    }).then(
        response => {
            return response.json()
        }
    ).catch(
        err => console.log(err)
        )
}