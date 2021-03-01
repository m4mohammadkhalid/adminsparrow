const { validationResult } = require('express-validator');


exports.runValidator=(request,response,next)=>{
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}