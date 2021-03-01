const mongoose = require('mongoose'); //! Erase if already required
//! Declare the Schema of the Mongo model
const {ObjectId} = mongoose.Schema;
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        min:3,
        max:160,
        required:true,
    },
    slug:{
        type:String,
        unique:true,
        index:true,
    },
    body:{
        type:{},
        required:true,
        min:200,
        max:2000000
    },
    //!excerpt mean just kuch content show kareega other ka post open hone ke baad dikhega
    excerpt:{
        type:String,
        max:1000
    },
    mtitle:{
        type:String
    },
    mdesc:{
        type:String
    },
    
    photo:{
        data:Buffer,
        contentType:String
    },
    categories:[{type:ObjectId, ref:'Category',required:true}],
    tags:[{type:ObjectId, ref:'Tag',required:true}],
    postedBy:{
        type:ObjectId,
        ref:'User',
    }

},{timestamps:true});

module.exports = mongoose.model('Blog', blogSchema);