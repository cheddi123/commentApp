

// @route POST
// /blogsAPI/auth/login
// @Desc : Login user
// @Auth : public
const login =(req,res)=>{
    console.log(req.body)
    res.json(req.body)
}

// @route POST
// /blogsAPI/auth/register
// @Desc : register 
// @Auth : public
const register =(req,res)=>{
    console.log(req.body)
    res.json(req.body)
}

// @route GET
// /blogsAPI/auth/logout
// @Desc : logout
// @Auth : public
const logout =(req,res)=>{
    console.log("I am logging out")
    res.send("<h3>I am logging out</h3>")
}


module.exports={login,logout,register}