const express = require('express');
const router = express.Router();
const {allBlogs,singleBlog,postBlog,updateBlog,deleteBlog,getForm}= require("../controllers/blogControllers");
const { body, validationResult,checkSchema } = require("express-validator");
const {validateBlog,validateComment}= require("../validation/validate");
const auth = require("../middleware/auth")


// Get all blogs
router.get("/",allBlogs)

// Get a single blog
router.get("/:id",auth,singleBlog)

// Post a blog 
router.post("/",auth,validateBlog, postBlog)

// Update a blog by ID
router.put("/:id",auth,updateBlog)

// delete a blog by ID
router.delete("/:id",auth,deleteBlog)

// Get the blog form
router.get("/blogsAPI/blogs/form",auth,getForm)

module.exports = router