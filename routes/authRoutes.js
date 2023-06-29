const express = require('express');
const router = express.Router()

// get login page
router.get("/login",(req,res)=>{
    res.json("I am logging to enter into the app ")
}
);

// Post login 
router.post("/login",(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

// Register a new user 
router.post("/register",(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

// Logout 
router.get("/logout",(req,res)=>{
    console.log("I am logging out")
    res.send("<h3>I am logging out</h3>")
})
module.exports=router