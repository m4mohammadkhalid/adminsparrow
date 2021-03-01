const express=require('express');
const router=express.Router();
const {requireSignin,adminMiddleware}=require('../controllers/loginController');
const {read}=require('../controllers/userController');


router.get('/profile',requireSignin,adminMiddleware,read)



module.exports=router;