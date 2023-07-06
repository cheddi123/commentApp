const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {type:String,required:true},
    blog: {type:String,required:true},
    user :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    comment :[{type:mongoose.Schema.Types.ObjectId,ref:"comment"}]
}, { timestamps: true });

const blog = mongoose.model("blog", BlogSchema);

module.exports = blog;   