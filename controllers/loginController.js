const { request, response } = require('express');
const expressJwt = require('express-jwt');
const jwt=require('jsonwebtoken')
const User = require('../models/usedModels')



exports.login=(request,response)=>{
    const {email,password} = request.body;
    User.findOne({email}).exec((err,user)=>{
        if(err|| !user){
            return response.status(400).json({
                error:"Email Does Not Exits"
            })
        }
        if(!user.authenticate(password)){
            return response.status(400).json({
                error:"Email And Password Does Not Match"
            })
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{ expiresIn: '1d'});
        
        response.cookie('token',token,{ expiresIn: '1d'});
        const {_id,username,name,email,mobile,roll}=user;
        return response.json({
            token,
            user:{_id,username,name,email,mobile,roll}
        })
    })
}

exports.signout=(request,response) => {
    response.clearCookie('token');
    response.json({
        message: 'Signout Success'
    })
};

exports.requireSignin=expressJwt({ secret:  process.env.JWT_SECRET,algorithms: ['sha1', 'RS256', 'HS256'] });




exports.authMiddleware=(request,response,next)=>{

        const authUserId=request.user._id
        User.findById({_id:authUserId}).exec((err,user)=>{
            if(err || !user){
                return response.status(400).json({
                    err:'user'
                })
            }
            request.profile=user
            next();
        })
}

exports.adminMiddleware=(request,response,next)=>{

    const adminUserId=request.user._id
    User.findById({_id:adminUserId}).exec((err,user)=>{
        if(err || !user){
            return response.status(400).json({
                err:'user not found'
            })
        }
        if(user.role!==1){
            return response.status(400).json({
                err:'Admin resource Access denied not found'
            })
        }
        request.profile=user
        next();
    })
}