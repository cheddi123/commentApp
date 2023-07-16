const { checkSchema } = require("express-validator")
const validateBlog = checkSchema({
    title:{trim:true,notEmpty:true,errorMessage:"Title is required"},
    blog:{trim:true,notEmpty:true,errorMessage:"Blog is required"}
});

const validateComment =  checkSchema({
    message:{trim:true,notEmpty:true,errorMessage:"Message is required"}
});

const validateRegistration =checkSchema({
    firstName:{trim:true,notEmpty:true,errorMessage:"FirstName is required"},
    lastName:{trim:true,notEmpty:true,errorMessage:"LastName is required"},
    email:{isEmail:true, trim:true,notEmpty:true,errorMessage:"Valid email is required"},
    password:{trim:true,notEmpty:true,isLength:{options:{min:5},errorMessage:"Password should be at least 5characters"}}
});
module.exports = {validateBlog,validateComment};