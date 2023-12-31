const jwt = require("jsonwebtoken")

function auth(req,res,next){
    //const token = req.header("x-auth-token")
    const token = req.cookies["x-auth-token"]  
    
    if(!token){
        console.log("Access denied: No token provided");
       //return res.status(401).send("Access denied: No token provided");
       req.flash('error', 'Access denied. No token provided.')
       return res.status(400).redirect("/blogsAPI/auth/login")
       //return res.status(400).json("Bad request : No token provided")
    }  
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=decoded;
        console.log(req.user)
        next();  
    } catch (ex) {
        console.log(ex.message)
        res.status(400).send("Invalid token")
    }
}   

module.exports= auth