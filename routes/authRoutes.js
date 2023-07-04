const express = require('express');
const router = express.Router()
const {login,logout,register}=require("../controllers/authControllers")

// get login page
router.get("/login",(req,res)=>{
    res.json("I am logging to enter into the app ")
}
);

// Post login 
router.post("/login",login)

// Register a new user 
router.post("/register",register)

// Logout 
router.get("/logout",logout)
module.exports=router