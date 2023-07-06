const { checkSchema } = require("express-validator")
const validateBlog = checkSchema({
    title:{trim:true,notEmpty:true,errorMessage:"Title is required"},
    blog:{trim:true,notEmpty:true,errorMessage:"Blog is required"}
})

const validateComment =  checkSchema({
    comment:{trim:true,notEmpty:true,errorMessage:"Comment is required"}
})
module.exports = {validateBlog,validateComment};