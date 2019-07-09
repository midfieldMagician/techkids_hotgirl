const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const UserApiRouter=require('./routers/users');
const PostApiRouter=require('./routers/posts');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost/tk-hotgirl-22',
                {useNewUrlParser:true},
                (err)=>{
                        if(err)console.log(err);
                        else console.log("DB connect success!");
                        });
app.use('/api/posts',PostApiRouter);
app.use('/api/users',UserApiRouter);
const port=6789;
app.listen(port,(err)=>{
if(err)console.log(err);
else console.log("server started");
});