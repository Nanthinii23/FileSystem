const express=require("express");
const multer=require("multer");
const bodyParser=require("body-parser");
const ImageModel=require("./image.model");
const db=require("mongoose");
const app=express();
db.connect('mongodb://localhost:27017/test',{
    family:4
});
db.connection.on('error',console.error.bind(console,"error while connection"));
db.connection.once('open',()=>{
    console.log("Db Connected");
});
app.use(bodyParser.json());
const Strong=multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload=multer({
    storage:Strong
}).single("image");
app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{

    if(err){
        console.log(err.stack);
    }
    else{
        const newImage=new ImageModel({
            name:req.body.name,
            image:{
                data:req.file.filename,
                contentType:"image/png"
            }
        });
        newImage.save();
    }
    res.send("Saved");
});
});
app.listen(3000);