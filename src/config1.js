//this page is to connect with create room
const mongoose=require("mongoose");

const connect =mongoose.connect("mongodb://0.0.0.0:27017/web_fiddle");
connect.then(()=>{
    console.log('mongoose connected');
})
.catch((error)=>{
    console.error('failed',error);
}) 


const roomSchema = new mongoose.Schema({
        roomName: {
            type: String,
            required: true,
            unique: true,
        },
        roomCode: {
            type: String,
            required: true,
            unique: true,
        }
        
    });
    
    // Model for teams
    const teamsCollection = new mongoose.model("teams", roomSchema);
    
    
    module.exports = teamsCollection;
