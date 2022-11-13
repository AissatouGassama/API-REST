const { application } = require('express');
const express=require ('express');
const server=express();
const mongoose=require('mongoose');
const validator=require('validator');

require('dotenv').config({path:'./config/.env'});

server.use(express.json());

// import USER Models
const User= require('./models/user')



const connectionDB= async () =>{
    try{
       await mongoose.connect(process.env.MONGO_URI,
            {useNewUrlParser:true, useUnifiedTopology: true });
            console.log("Connected.")
    }
    catch(err){
        console.log(err)
    }
    
}
connectionDB()

//HOME
//server.get('/t', (req, res)=>{
//res.send('hello World')})

//RETURN ALL USERS 
 server.get('/users', (req,res)=>{
    User.find({}, (err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
        }
    })
});

//ADD ANEW USER TO THE DATABASE
server.post('/users', (req, res, next)=>{
    const user= new User({
        name: req.body.name,
        age: req.body.age,
        email:req.body.email
        
    });
    user.save((err, data)=>{
        res.status(200).json({code: 200, message:'User added succesfully'})
    });

});

//EDIT A USER BY ID
server.put('/users/:id', (req, res, next)=>{
    const user= new User({
        name: req.body.name,
        age: req.body.age,
        email:req.body.email
        
    });
    User.findByIdAndUpdate(req.params.id, {$set:user}, (err, data)=>{
        if(!err){
            res.status(200).json({code:200, message:'User updated successfully'}, {new:'true'},)
        }else{
            console.log(err)
        }
    })

});

server.listen(3000, ()=>{
    console.log('server running on 3000');

});

