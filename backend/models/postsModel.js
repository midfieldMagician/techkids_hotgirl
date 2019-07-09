const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const model=mongoose.model;

const CommentSchema=new Schema({
        author:String,
        content:String
},{
    _id:false,
    versionKey:false,
    timestamps:false
});
const PostSchema=new Schema({
    like:{
        type:Number,
        default:0
    },
    view:{
         type:Number,
         default:0
    },
    image:{type:String,
        required:true},
    caption:String,
    comments:[CommentSchema],
    author:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    title:String 
 },{
     timestamps:true//createdAt,updatedAt
 });

 module.exports=model('Posts',PostSchema);