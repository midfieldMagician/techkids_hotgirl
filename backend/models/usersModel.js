const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const model=mongoose.model;

const UserSchema=new Schema({
    userName:{type:String,
        required:true,
        unique:true
    },
    name:String,
    password:{type:String,
        required:true},
    avatar:String,
    email:{type:String,
        unique:true}
});


 
module.exports=model('Users',UserSchema);

