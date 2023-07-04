const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Please enter your first name'],
	},
	last_name: { type: String, required: [true,'Please enter your last name'] },
	email: {
		type: String,
		unique: true,
        required: [true, "Please enter your email"],
        validate: [validateEmail, "Please enter a valid email"], 

	},
});
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };