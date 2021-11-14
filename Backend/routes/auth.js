var express = require("express")
var router = express.Router()
const {check, validationResult} = require('express-validator')

const {signout, signup, signin, isSignedIn} = require("../controllers/auth")

router.post("/signup",[
    check("name", "Name should contain atleast 3 characters.").isLength({min:3,max:15}),
    check("email","Email is required.").isEmail(),
    check("password","Password should be atleast 6 character and Alphanumeric.").isLength({min:6,max:12}).isAlphanumeric(),
],signup
);

router.post("/signin",[
    check("email","Email is required.").isEmail(),
    check("password","Password field is required.").isLength({min:6,max:12}),
],signin
);


router.get("/signout", signout)
// router.get("/testroute",isSignedIn, (req,res)=>{
//    res.json(req.auth) 
// });

module.exports= router;