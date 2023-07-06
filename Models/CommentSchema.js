const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    comment: {type:String,required:true},
    userId :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    blogId :{type:String}
    
   
}, { timestamps: true });

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;  