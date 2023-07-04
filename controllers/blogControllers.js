// @route GET
// /blogsAPI/blogs
// @Desc : Get all blogs
// @Auth : public

const allBlogs =(req,res)=>{
    res.json("Get all blogs")
};

// @route GET
// /blogsAPI/blogs/:id
// @Desc : Get a single blog
// @Auth : private
const singleBlog = (req,res)=>{
    res.json("Get a single blog")
};

// @route POST
// /blogsAPI/blogs
// @Desc : Post a blog
// @Auth : private
const postBlog =(req,res)=>{
    res.json("Posted a blog")
};

// @route PUT
// /blogsAPI/blogs/:id
// @Desc : Update a blog
// @Auth : private
const updateBlog =(req,res)=>{
    res.json("Update a blog")
}

// @route DELETE
// /blogsAPI/blogs
// @Desc : Delete a blog
// @Auth : private
const deleteBlog=(req,res)=>{
    res.json("Deleted a blog")
}
module.exports={allBlogs,singleBlog,postBlog,updateBlog,deleteBlog}