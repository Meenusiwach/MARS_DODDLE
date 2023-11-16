// this is to connect the the mongodb with the server for login and signup page
const mongoose=require("mongoose");

const connect =mongoose.connect("mongodb://0.0.0.0:27017/web_fiddle");
connect.then(()=>{
    console.log('mongoose connected');
})
.catch((error)=>{
    console.error('failed',error);
})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("users",LoginSchema);

module.exports = collection;
