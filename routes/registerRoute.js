const express=require('express');
const router=express.Router();
const {register}=require('../controllers/registrationController');

const {runValidator}=require('../validator/index')
const {userSignupRegister}=require('../validator/auth');


router.post('/register',userSignupRegister,runValidator,register)

module.exports=router;