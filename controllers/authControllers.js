const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @route POST
// /blogsAPI/auth/login
// @Desc : Login user
// @Auth : public
const login = async (req, res) => {
	let user = await User.findOne({
		email: new RegExp(`^${req.body.email}$`, 'i'),
	});
    //console.log(user)
	if (!user) {
		req.flash('error', 'Invalid email or password');
		return res.status(400).json('Invalid email ');
		//return res.status(400).redirect("/user/form")
	}
    
	const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(user.password)
    console.log(req.body.password)
	if (!isMatch) {
		req.flash('error', 'Invalid email or password');
		return res.status(400).json('Invalid password');
		//return res.status(400).redirect("/user/form")
	}

	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: '10m',
	});

	res
		.cookie('x-auth-token', token, { maxAge: 1000 * 60 * 10, httpOnly: true })
		.json('user logged in ');
};

// @route POST
// /blogsAPI/auth/register
// @Desc : register
// @Auth : public
const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

	//if (user) return res.json("Email already exist");
	if (user) {
		// req.flash("error","Email already exist")
		// return res.redirect("/user/register");
		return res.status(400).json(`${email} already exist`);
	}

	try {
		user = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		});

		const newUser = await user.save();
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: '10m',
		});

		//res.cookie("x-auth-token",token,{maxAge:60*10*1000,httpOnly:true}).redirect("/comment/all")
		// res.header("x-auth-token",token).json(newUser)
		console.log(newUser);
		res
			.cookie('x-auth-token', token, { maxAge: 60 * 10 * 1000, httpOnly: true })
			.json(newUser);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

// @route GET
// /blogsAPI/auth/logout
// @Desc : logout
// @Auth : public
const logout = (req, res) => {
	console.log('I am logging out');
	res.cookie("x-auth-token","",{maxAge:100}).json("I am logging out")
    
};

module.exports = { login, logout, register };
