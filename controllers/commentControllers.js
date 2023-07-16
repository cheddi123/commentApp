const Comment = require('../Models/CommentSchema');
const Blog = require('../Models/BlogSchema');
const { validationResult } = require('express-validator');

// @route GET
// /blogsAPI/comments/
// @Desc : Get ALL comments in the database
// @Auth : public
const allComments =async(req,res)=>{
    try {
         const comments = await Comment.find()
         res.json(comments)
    } catch (error) {
        res.send(error.message)
    }
   
}


// @route POST
// /blogsAPI/comments/:blogId
// @Desc : Post a comment of a particular blog and updating that blog also
// @Auth : private

const comment = async (req, res) => {
	const result = validationResult(req);
	try {
		if (!result.isEmpty()) {
			//return res.json({ errors: result.array().map((err) => err.msg) });
            const errMessage =  result.array().map((err) => err.msg); 
            req.flash("error",errMessage);
            return res.redirect(`/blogsAPI/blogs/${req.params.blogId}`)
		}

		const comment = new Comment({
			message: req.body.message,
			user: req.user._id,
            blogId: req.params.blogId

		});
		await comment.save();
        // Adding the comment to the blog
        const blogId= req.params.blogId;
        await  Blog.findByIdAndUpdate(blogId,{$push:{comment:comment._id}},{new:true});
		//res.json(comment);
        res.redirect(`/blogsAPI/blogs/${blogId}`)
	} catch (error) {
        console.log(error)
		res.status(400).send('Could not save to DB');
	}
};

// @route GET
// /blogsAPI/comments/:blogId
// @Desc : Get ALL comments for a particular blog
// @Auth : private
const blogComments = async (req, res) => {
	try {
		const comments = await Comment.find({ blogId: req.params.blogId }).sort({updatedAt:-1});
		res.json(comments);
	} catch (error) {
		res.status(400).json('Comments for that blog cannot be found');
	}
};

// @route PUT
// /blogsAPI/comments/:commentId
// @Desc : Update a comment of a particular blog
// @Auth : private

const updateComment = async (req, res) => {
	try {
		const userId = req.user._id
		let comment = await Comment.findById(req.params.commentId).populate("user", [ "_id","firstName", "lastName"]).exec();
        if(!comment) throw new Error("Comment cannot be found");

		if (userId == comment.user._id) {
			comment = await Comment.findByIdAndUpdate(
				req.params.commentId,
				{
					$set: {
						message: req.body.message,
					},
				},
				{ new: true }
			);
			console.log(comment);
			// return res.redirect("/blogsAPI/comment/all")
			return res.json(comment);
		} else {
			throw new Error('Unauthorized to update this comment');
		}
	} catch (error) {
		res.status(401).json(error.message);
	}
};


// @route DELETE
// /blogsAPI/comments/:commentId
// @Desc : Delete a comment of a particular blog
// @Auth : private

const deleteComment =async(req,res)=>{
    try {
		const userId = req.user._id
		let comment = await Comment.findById(req.params.commentId).populate("user", [ "_id","firstName", "lastName"]).exec();
        if(!comment) throw new Error("Comment cannot be found");

		if (userId == comment.user._id) {
			await Comment.findByIdAndDelete(comment._id)
			console.log(comment);
			// return res.redirect("/comment/all")
			return res.json(comment);
		} else {
			throw new Error('Unauthorized to delete this comment');
		}
	} catch (error) {
		res.status(401).json(error.message);
	}
}

module.exports = { comment, blogComments,updateComment,allComments,deleteComment};
