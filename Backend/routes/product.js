const express = require("express");
const router = express.Router();

const{getProductById, 
    createProduct, 
    getProduct, 
    photo,updateProduct, 
    removeProduct, 
    getAllProducts, 
    getAllUniqueCategories
                }= require("../controllers/product")
const{isSignedIn, isAuthenticated,isAdmin}= require("../controllers/auth")
const{getUserById}= require("../controllers/user")


//all params
router.param("userId", getUserById);
router.param("productId", getProductById);

//All routes
router.get("/product/:productId", getProductById);

//Create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

// Get
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//Update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

//Delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

//Listing
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;

