const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date
    }
})

module.exports=mongoose.model("post",postSchema);