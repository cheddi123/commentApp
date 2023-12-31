const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: { type: String, required: true},
	email: {
		type: String,
		unique: true,
        required: [true, "Please enter your email"],
        validate: [validateEmail, "Please enter a valid email"], 

	},
	password: { type: String,required:true,minLength:[5,"Password should be at least 5 characters long."]},
	created_at:{type:Date,default:Date.now}
});

// Use a pre validation function to harsh the password before it get saves to the database
UserSchema.pre("save",async function(next ){
	
		
	// Using bcrypt 
    const saltRounds = 10; 
	const salt = await bcrypt.genSalt(saltRounds)
	this.password= await bcrypt.hash(this.password, salt)
	

});

function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
 
  function validateName(value){
	const regex = /^[a-zA-Z]{3,}$/;
    return regex.test(value);
  }

UserSchema.path('firstName').validate(validateName,"FirstName is should be at least 3 alpha char");
UserSchema.path('lastName').validate(validateName,"lastName is should be at least 3 alpha char");

const user = mongoose.model("user", UserSchema);

module.exports=user;