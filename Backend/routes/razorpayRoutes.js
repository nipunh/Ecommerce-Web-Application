const express = require("express");
const router = express.Router();

const{isSignedIn, isAuthenticated }= require("../controllers/auth")
const{processPayment} = require("../controllers/razorpayment")
const{getUserById}= require("../controllers/user")

//Params
router.param("userId", getUserById);

//Routes
router.post("/razorpay/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;