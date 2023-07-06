const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {type:String,required:true},
    comment: {type:String,required:true},
    user :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    usercomment :[{type:mongoose.Schema.Types.ObjectId,ref:"usercomment"}]
}, { timestamps: true });

const blog = mongoose.model("blog", BlogSchema);

module.exports = blog;   