const shortId=require('shortid')
const User = require('../models/usedModels')


const register=(request,response)=>{
    User.findOne({email:request.body.email}).exec((err,user)=>{
            if(user){
                return response.status(400).json({
                    error:'Email Is Taken'
                });
            }
                const {name,email,mobile,password}=request.body
                let username=shortId.generate()
                let profile=`${process.env.CLIENT_URL}/profile/${username}`
            
            let newUser = new User({name,email,mobile,password,profile,username})
            newUser.save((err, success)=>{
                if(err){
                    return response.status(400).json({
                        error:err
                    })
                      
                }
                response.json({
                    message:'Signup success Plaese Signin'
                })
            })
        })
}

module.exports ={
    register
}

