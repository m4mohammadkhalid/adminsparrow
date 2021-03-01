const { response } = require('express')
const Category = require('../models/category')
const  slugify = require('slugify')
const {errorHandler}=require('../helpers/dbErrorHandler')


exports.create=(request,response)=>{
    const{name}=request.body
    let slug=slugify(name).toLowerCase();
    let category=new Category({name,slug});

    category.save((err,data)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            })
        }
        response.json(data);

    })
}

exports.list=(request,response)=>{
    Category.find({}).exec((err,data)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            });
        }
        response.json(data);
    })
}


exports.read=(request,response)=>{
    const slug=request.params.slug.toLowerCase()
    Category.findOne({slug}).exec((err,category)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            });
        }
        response.json(category);
    })
}

exports.remove=(request,response)=>{
    const slug=request.params.slug.toLowerCase()
    Category.findOneAndRemove({slug}).exec((err,data)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            });
        }
        response.json({
            message:'Category Delete'
        });
    })
}