const { body, validationResult } = require('express-validator');
const Blog = require('../Models/BlogSchema');
const Comment = require('../Models/CommentSchema');

// @route GET
// /blogsAPI/blogs
// @Desc : Get all blogs
// @Auth : public
const allBlogs = async (req, res) => {
	try {
		const allBlogs = await Blog.find({})
			.sort({ updatedAt: -1 })
			.populate('user', ['firstName', 'lastName'])
			.exec();
        const comments = await Comment.find({})
        //console.log(comments)
        //console.log(allBlogs)
        
		//const auth=req.cookies["x-auth-token"]
		//console.log(req.cookies["x-auth-token"])
		// if (allBlogs.length == 0)
		//	return res.json('There are no comments at the moment');
		
		res.render("blogs.ejs", {allBlogs} )
		//res.json(allBlogs);
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
};

// @route GET
// /blogsAPI/blogs/:id
// @Desc : Get a single blog
// @Auth : private
const singleBlog = async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findById(id).populate("user", ["_id","firstName", "lastName"]).populate({path:"comment",populate:{path:"user",model:"user",select:'firstName lastName'}}).exec()
		if (blog == null) throw new Error('Blog cannot be found');

		//console.log(blog);
		 //res.json(blog);
         const errMessage = req.flash("error")

		 res.render("singleBlog.ejs",{blog,errMessage})
	} catch (error) {
		console.log(error.message); 
		res.status(400).send(error.message);
	}
};

// @route POST
// /blogsAPI/blogs
// @Desc : Post a blog
// @Auth : private
const postBlog = async (req, res) => {
	//console.log(req.body)
	const result = validationResult(req);

	// console.log(req.user._id)

	try {
		if (!result.isEmpty()) {
			return res.json({ errors: result.array().map((err) => err.msg) });
		}
		const blog = new Blog({
			title: req.body.title,
			blog: req.body.blog,
			user: req.user._id,
		});
		await blog.save();
		res.json(blog);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

// @route PUT
// /blogsAPI/blogs/:id
// @Desc : Update a blog
// @Auth : private
const updateBlog = async (req, res) => {
	try {
		const userId = req.user._id;
		// console.log(userId)
		let blog = await Blog.findById(req.params.id);
        if(!blog) throw new Error("Blog cannot be found");
		if (userId == blog.user._id) {
			blog = await Blog.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						title: req.body.title,
						blog: req.body.blog,
					},
				},
				{ new: true }
			);
			console.log(blog);
			//return res.redirect("/blog/all")
			return res.json(blog);
		} else {
			throw new Error('Unauthorized to update this blog');
		}
	} catch (error) {
		res.status(403).send(error.message);
	}
};

// @route DELETE
// /blogsAPI/blogs
// @Desc : Delete a blog
// @Auth : private
const deleteBlog = async (req, res) => {
	
	try {
        const userId = req.user._id;
	    let blog = await Blog.findById(req.params.id);
		if (!blog) throw new Error('Blog cannot be found');

		if (userId == blog.user._id) {
			blog = await Blog.findByIdAndDelete(req.params.id);
			await Comment.deleteMany({ blogId: blog._id });
			//return res.redirect("/comment/all")
			return res.json(blog);
		} else {
			throw new Error('Unauthorized to delete this comment');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

// @route GET
// /blogsAPI/blogs/form
// @Desc : Get a blog form
// @Auth : private
const getForm = (req, res) => {
    res.render("blogForm.ejs")
}

module.exports = { allBlogs, singleBlog, postBlog, updateBlog, deleteBlog,getForm };
