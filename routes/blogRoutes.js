const express = require('express');
const router = express.Router()
const {allBlogs,singleBlog,postBlog,updateBlog,deleteBlog}= require("../controllers/blogControllers")

// Get all blogs
router.get("/",allBlogs)

// Get a single blog
router.get("/:id",singleBlog)

// Post a blog 
router.post("/",postBlog)

// Update a blog by ID
router.put("/:id",updateBlog)

// delete a blog by ID
router.delete("/:id",deleteBlog)

module.exports = router