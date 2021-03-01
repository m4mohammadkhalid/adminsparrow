'use strict';

const uniqueMessage=error=>{
    let output;
    try {
        let fieldName=err.message.substring(error.message.lastIndexOf('.$')+ 2,error.message.lastIndexOf('_1'));
         output= fieldName.charAt(0).toUpperCase()+fieldName.slice(1)+ 'Alredy Exist';
    
        } catch (ex) {
            output="Unique Fields Already Exit"
    }
    return output;
};

exports.errorHandler=error=>{
    let message='';

    if(error.code){
        switch(error.code) {
            case 11000:
            case 11001:
            message=uniqueMessage(error);
            break;
            default:
                message='Something Went Wrong'
        }
    }else{
        for(let errorName in error.errorors){
            if(error.errorors[errorName].message) message=error.errorors[errorName].message;
        }
    }
    return message;
}