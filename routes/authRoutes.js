const express = require('express');
const router = express.Router()
const {login,logout,register,loginForm,getRegister}=require("../controllers/authControllers")

// get login page
router.get("/login",loginForm);

// get registration form
router.get("/register",getRegister)

// Post login 
router.post("/login",login)

// Register a new user 
router.post("/register",register)

// Logout 
router.get("/logout",logout)
module.exports=router  