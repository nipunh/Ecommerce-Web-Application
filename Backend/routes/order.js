const express = require("express");
const router = express.Router();

const{isSignedIn, isAuthenticated,isAdmin}= require("../controllers/auth")
const{getUserById, pushOrderInPurchaseList}= require("../controllers/user")
const{updateStock} = require("../controllers/product")
const{getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require("../controllers/order")


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//All Routes
//TODO: ADD UPDATE STOCK AND PUSHTOPURCHASE LIST
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAuthenticated, getAllOrders);

//Status of order routes
router.get("/order/status/:userId", isSignedIn,isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;