const User = require("../models/user")
const Order = require("../models/order")



exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=> {
        if(err || !user){
            return res.status(400).json({
                error : "No user found."
            })
        }

        req.profile = user;
        next();
    });
};


exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
};


exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (err, user) => {
            if(err || !user){
                err : "Not authorized to update information."
                console.log(err)
            }
            res.json(user)
        }
    )
}

//get purchase list
exports.userPurchaseList = (req,res) => {
    Order.find({user : req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                message : 'No orders placed.'
            })
        }
        return res.json(order)
    })
}

//Middleware //add to purchase list
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.products.forEach(products => {
        purchases.push({
            _id : products._id,
            name : products.name,
            description : products.description,
            category : products.category,
            quantity : products.count,
            amount : req.body.amount,
            transaction_id : req.body.transaction_id

        })
    });
    
    // console.log(purchases);
//Store this in DB.
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases : purchases}},
        {new : true},
        (err, purchases) =>{
            if(err){
                return res.status(400).json({
                    message : "Unable to update purchase list."
                });
            }
            next();
        }
    );
};



//exercise to view all users data
exports.getAllUsers = (req,res) => {
    User.find().exec((err, users)=>{
        if(err || !users){
            return res.status(400).json({
                error : "No user found."
            })
        }
        users.salt = undefined;
        users.encry_password = undefined;
        res.json(users)
    })
}