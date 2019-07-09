const express=require('express');
const PostRouter=express.Router();
const PostModel=require('../models/postsModel');

//GET MANY
PostRouter.get('/',(req,res)=>{
    const page=req.query.page||1;//stt trang
    const perPage=req.query.perPage||5;//số phần tử 1 trang
    PostModel.count({},(err,totalPost)=>{
        if(err)res.send({success:false,err});
        else{
            //có thể .populate nhiều lần để access nhiều field
            //param 2nd của find() và populate() là select field hiện ra (+_id)
            PostModel.find({},'author image caption title')
            .populate('author','-password')
            .skip(perPage*(page-1))//hoặc limit(perPage) để phân chia trang
            .limit(perPage)
            .exec((err,posts)=>{
                if(err)res.send({success:false,err})
                else res.send({success:true,totalPost,data:posts});
            });
        }
    });
    
});

PostRouter.get('/:id',(req,res)=>{
    const id=req.params.id;
    //const {id}=req.params;
    PostModel.findById(id,(err,postFound)=>{
        if(err)console.log(err);
        else if(!postFound)res.send({success:false,err:'Post Not Found'});
        else res.send({success:true,data:postFound});
    });
});

//create
PostRouter.post('/',(req,res)=>{
    PostModel.create(req.body,(err,postCreated)=>{
        if(err)res.send({success:false,err})
        else res.send({success:true,data:postCreated});
    });
});

PostRouter.put('/:id',(req,res)=>{
    const id=req.params.id;
    //C1
    UserModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true},
        //userUpdated is actually not updated yet.
        (err,postUpdated)=>{
            if(err)res.send({success:false,err});
            else res.send({success:true,data:postUpdated});
    });
    //C2: tìm trc rồi update
    // UserModel.findById(id,(err,userFound)=>{
    //     if(err)console.log(err);
    //     else if(!userFound)res.send({success:false,err:'User Not Found'});
    //     else {
    //         //key chạy từng prop trong 1 obj 
    //         for(let key in req.body){
    //             userFound[key]=req.body[key];
    //             userFound.save((err,userUpdated)=>{
    //                 if(err)res.send({success:false,err});
    //                 else res.send({success:true,data:userUpdated});
    //             })
    //         }
    //     }
    // });


});

PostRouter.delete('/:id',(req,res)=>{
    const id=req.params.id;
    PostModel.findByIdAndDelete(id,req.body,(err)=>{
        if(err)res.send({success:false,err});
        else res.send({success:true,data:null});
    });
});




module.exports=PostRouter;