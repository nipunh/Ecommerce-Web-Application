const express = require("express")
const router = express.Router()

const {getUserById, getUser, updateUser, getAllUsers, userPurchaseList} =  require("../controllers/user")
const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth")

router.param("userId", getUserById);

//Get User
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);


//Update user data
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)


//Populate product
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)


//exercise to view all users data
router.get("/users", getAllUsers)

module.exports = router;