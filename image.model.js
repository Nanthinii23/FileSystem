const mongoose=require('mongoose');
const ImageSchema={
    name:{
        type:String,
        require:true
    },
    image:{
        data:Buffer,
        contentType:String

    }
}
module.exports=ImageModel=mongoose.model('ImageModel',ImageSchema);