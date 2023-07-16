const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    message: {type:String,required:true},
    user :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}, 
    blogId:{type:String} 
}, { timestamps: true });

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;  