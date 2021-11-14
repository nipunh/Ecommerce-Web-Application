const Razorpay = require('razorpay')
const { v4: uuidv4 } = require('uuid');

const razorpay = new Razorpay({
    key_id: 'rzp_test_qRcTHV7Ox0QAYL',
    key_secret: 'MYV4HOKFHr5vGNLOHbCaqpMK'
})

exports.processPayment = (req, res) => {
    const {products, token} = req.body;
    console.log("Products", products)

    let amount = 0;
    products.map(p => {
        amount = amount + p.price
    })

    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: uuidv4(),
        payment_capture: '0'
      };
      
      razorpay.orders.create(options, function(err, order) {
    console.log(order);
      });
}