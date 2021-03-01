const express=require('express');
const router=express.Router();
const {create,list,read,remove}=require('../controllers/category');


//validator
const {runValidator}=require('../validator/index')
const {categoryCreateValidator}=require('../validator/category');
const {requireSignin,adminMiddleware}=require('../controllers/loginController');


router.post('/category',categoryCreateValidator,runValidator,requireSignin,adminMiddleware,create)
//!crud operation
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',requireSignin,adminMiddleware,remove)


module.exports=router;