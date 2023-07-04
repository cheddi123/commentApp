require('dotenv').config()
const morgan = require('morgan')
const colors=require('colors')
const express = require('express');
const {connectDB}= require("./config/connectDB")
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes")
const blogRoutes = require("./routes/blogRoutes")


// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json())
 
if(process.env.NODE_ENV=='development'){ 
	app.use(morgan('dev'))
}  
 


// Routes Middleware 
app.use("/blogsAPI/auth/",authRoutes)
app.use("/blogsAPI/blogs/",blogRoutes)
app.get("/",(req,res)=>{
    res.send("Welcome everyone") 
})

app.use((req,res)=>{ 
	res.status(404).json("Page not found")
})

// Connect to the mongo database
connectDB()

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Running on port ${PORT}`.bgYellow);
});
 
 
 