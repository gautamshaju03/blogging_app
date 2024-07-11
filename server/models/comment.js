const mongoose=require("mongoose")


const commentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    comments:{
        required:true,
        type:String
    }

})

module.exports=mongoose.model("comment",commentSchema);