const express = require("express");
const path = require("path");
const app = express();
 const bcrypt = require("bcrypt");
const collection = require("./config");
const port =  5000;

 app.use(express.json());

 app.use(express.urlencoded({ extended: false }))

// const tempelatePath = path.join(__dirname, '../tempelates')
// const publicPath = path.join(__dirname, '../public')
// console.log(publicPath);

app.set('view engine', 'ejs')

 app.use(express.static("public"))


// // hbs.registerPartials(partialPath)



app.get('/', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
//C:\Program Files\MongoDB\Server\6.0\bin>


// // app.get('/home', (req, res) => {
// //     res.render('home')
// // })

app.post("/signup", async (req, res) => {
    
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser= await collection.findOne({name:data.name});
    if(existingUser){
res.send("user already  exists. Please choose another username.");
    }
    else{
        const saltrounds = 10;
        const hashedpassword = await bcrypt.hash(data.password,saltrounds);
        data.password = hashedpassword;
const userdata = await collection.insertMany(data);
    console.log(userdata);
    }
    }
)

app.post("/login" ,async(req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        const ispasswordmatch = await bcrypt.compare(req.body.password,check.password);
        if(ispasswordmatch){
            res.render("home");
        }else{
            req.send("wrong password");
        }
    }
catch{
          res.send("wrong details");
}
});
app.listen(port, () => {
    console.log('server running on the port');
})
