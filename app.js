require('dotenv').config()
const morgan = require('morgan')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes")

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(morgan('tiny'))

// Routes Middleware
app.use("/",userRoutes)
app.get("/",(req,res)=>{
    res.send("Welcome everyone") 
})

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Running on port ${PORT}`);
});
 