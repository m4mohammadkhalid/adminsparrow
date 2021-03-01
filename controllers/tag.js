const { response } = require('express')
const Tag = require('../models/tag')
const  slugify = require('slugify')
const {errorHandler}=require('../helpers/dbErrorHandler')


exports.create=(request,response)=>{
    const{name}=request.body
    let slug=slugify(name).toLowerCase();
    let tag= new Tag({name,slug});

    tag.save((err,data)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            })
        }
        response.json(data);

    })
}

exports.list=(request,response)=>{
    Tag.find({}).exec((err,data)=>{
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
    Tag.findOne({slug}).exec((err,category)=>{
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
    Tag.findOneAndRemove({slug}).exec((err,data)=>{
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