const express=require('express');
const router=express.Router();


//!Controller 
const {requireSignin,adminMiddleware}=require('../controllers/loginController');
const {create,list,read,remove}=require('../controllers/tag');

//!validator
const {runValidator}=require('../validator/index')
const {createTagValidator}=require('../validator/tag');


router.post('/tag',createTagValidator,runValidator,requireSignin,adminMiddleware,create)
//!crud operation
router.get('/tag',list)
router.get('/tags/:slug',read)
router.delete('/tags/:slug',requireSignin,adminMiddleware,remove)


module.exports=router;