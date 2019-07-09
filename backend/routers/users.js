const express=require('express');
const UserRouter=express.Router();
const UserModel=require('../models/usersModel');
//CRUD

//GET MANY
UserRouter.get('/',(req,res)=>{
    UserModel.find({},(err,users)=>{
        if(err)console.log(err);
        else res.send({success:true,data:users});
    });
});
//k cần /api/users.:id vì trong server.js :app.use('/api/users',...);
UserRouter.get('/:id',(req,res)=>{
    const id=req.params.id;
    //const {id}=req.params;
    UserModel.findById(id,(err,userFound)=>{
        if(err)console.log(err);
        else if(!userFound)res.send({success:false,err:'User Not Found'});
        else res.send({success:true,data:userFound});
    });
});

//create
UserRouter.post('/',(req,res)=>{
    UserModel.create(req.body,(err,userCreated)=>{
        if(err)res.send({success:false,err})
        else res.send({success:true,data:userCreated});
    });
});

UserRouter.put('/:id',(req,res)=>{
    const id=req.params.id;
    //C1
    UserModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true},
        //userUpdated is actually not updated yet.
        (err,userUpdated)=>{
            if(err)res.send({success:false,err});
            else res.send({success:true,data:userUpdated});
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

UserRouter.delete('/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete(id,req.body,(err)=>{
        if(err)res.send({success:false,err});
        else res.send({success:true,data:null});
    });
});




module.exports=UserRouter;