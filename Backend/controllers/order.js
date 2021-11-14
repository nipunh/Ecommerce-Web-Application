const {Order, ProductCart} = require("../models/order");
const {User} = require("../models/user")

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exe((err, order)=>{
         if(err){
                return res.status(400).json({
                    error : "Order not found."
                });
            }
            req.order = order;
            next(); 
        });
}

exports.createOrder = (req, res) => {
    
    const order = new Order(req.body)
    order.User = req.profile;
    // console.log(order)
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                error : "Failed to place your order."
            });
        }
        res.json(order);
    });
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name" )
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error : "Failed to retrive orders."
            });
        }
        res.json(order);
    })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("Status").enumValues);
}

exports.updateStatus = (req, res) => {
    Order.update(
        {_id : req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    error : "Failed to update order status."
                });
            }
            res.json(order);
        }
    )
}