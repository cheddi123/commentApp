const mongoose = require('mongoose')

// Connect to the database
 exports.connectDB = async()=>{
	try {
	const conn=	await mongoose.connect(process.env.MONGO_URI,{
		 useNewUrlParser: true 
	});
	console.log(`Connected on ${conn.connection.host}`.bgWhite)
    
		
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	} 
};

