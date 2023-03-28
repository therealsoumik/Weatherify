const express = require("express");
const app= express();
const path=require("path");
const hbs= require('hbs');
require("./db/conn");

const Register= require("./models/register");

const port = process.env.PORT || 3000;
const static_path =  path.join(__dirname , "../public");
const static_hello =  path.join(__dirname , "../main");

const partials_path =  path.join(__dirname , "../partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.use(express.static(static_hello));


app.set("view engine", "hbs");
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>
{
    res.render("home");
});
app.get("/register",(req,res)=>{
    res.render("register")
});
app.post("/register", async (req,res)=>{
    try {
      const password= req.body.password;
      const cpassword= req.body.confirmpassword;
      if(password === cpassword){
          const registerEmployee = new Register({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
          })
          const registered=  await registerEmployee.save();
          res.status(201).render("login");
      }else{
        res.send("passwords are not matching");
      }


    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/login",(req,res)=>{
    res.render("login")
});
app.post("/login",async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail= await Register.findOne({email:email});
        
        if(useremail.password === password){
            res.sendFile(path.join(__dirname , "../main/index.html"));
          
        }else{
            res.send("Invalid Login Details");
        }
    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
});

app.listen(port ,() =>{
    console.log('server is running at port no',port);
})