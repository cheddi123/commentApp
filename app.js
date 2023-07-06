require('dotenv').config()
const morgan = require('morgan')
const colors=require('colors')
const express = require('express');
const {connectDB}= require("./config/connectDB")
const flash = require('connect-flash');
const session = require('express-session')
const path = require('path')
//const { faker } = require('@faker-js/faker')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const app = express();
const PORT = process.env.PORT || 3000;


const authRoutes = require("./routes/authRoutes")
const blogRoutes = require("./routes/blogRoutes")


if(!process.env.JWT_SECRET_KEY){
    console.log("fatal error: secret jwtscertkey")
    process.exit(1);
}
 
// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    cookie:{maxAge:6000}, 
    saveUninitialized:false,
    resave:false
}))  
app.use(flash());
 
if(process.env.NODE_ENV=='development'){ 
	app.use(morgan('dev'))
}  


// override with POST having ?_method=DELETE 
app.use(methodOverride('_method'))


// Routes Middleware 
app.use("/blogsAPI/auth/",authRoutes)
app.use("/blogsAPI/blogs/",blogRoutes)
app.get("/",(req,res)=>{
    res.render("home.ejs") 
})

// Default page when there is no matching routes 
app.use((req,res)=>{ 
	res.status(404).json("Page not found")
})

// Connect to the mongo database
connectDB()

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Running on port ${PORT}`.bgYellow);
});
 
 
 