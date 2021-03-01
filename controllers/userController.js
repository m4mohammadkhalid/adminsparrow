const User = require('../models/usedModels')

exports.read=(request,response)=>{
    request.profile.hashed_password=undefined;
    return response.json(request.profile)
}