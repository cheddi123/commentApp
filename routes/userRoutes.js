const express = require('express');
const router = express.Router()

router.get("/user",(req,res)=>{
    res.json("I am a user ")
}
);


module.exports=router