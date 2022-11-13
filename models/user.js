const mongoose=require('mongoose');
const {Schema}=mongoose;


const UsersSchema=new Schema({
    name: {type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true}

})

const User=mongoose.model('User', UsersSchema);


  module.exports=User;
