const express = require("express");
const router = express.Router();

const{isSignedIn, isAuthenticated }= require("../controllers/auth")
const{getToken, processPayment} = require("../controllers/payment")
const{getUserById}= require("../controllers/user")

//Params
router.param("userId", getUserById);

//ROutes
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;