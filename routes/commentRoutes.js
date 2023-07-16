const express = require('express');
const router = express.Router();
const {comment,blogComments,updateComment,allComments,deleteComment}= require("../controllers/commentControllers")
;
const {validateComment}= require("../validation/validate");
const auth = require("../middleware/auth")

// post a comment
router.post("/:blogId",auth,validateComment, comment)

// Get all comments from a particular blog
router.get("/:blogId",blogComments)

// Update a comment
router.put("/:commentId",auth,validateComment,updateComment)

// Get ALL comments found in the database
router.get("/",allComments)

// Delete a comment 
router.delete("/:commentId",auth,deleteComment)
 


module.exports=router