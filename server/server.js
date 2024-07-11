const express=require("express")
const cors=require("cors")
const connectMongoDB=require("./config/db")
const dotenv=require("dotenv")
const router = require("./routes/route");

dotenv.config();

const app=express()
app.use(express.json());

connectMongoDB();

app.use(cors({
    origin:[
        "https://eloquent-dragon-35de42.netlify.app"
    ],
    credentials:true
}))
app.use('/', router);
app.get("/",async(req,res)=>{
    return res.status(200).send({message:"App is running"})
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
}

const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports=app;
