const express=require('express');
const router=express.Router();
const {create, list, listAllBlogsCategoriesTags,read, remove, update}=require('../controllers/blog')

const {requireSignin,adminMiddleware}=require('../controllers/loginController');

router.post('/blog',requireSignin,adminMiddleware,create)
router.get('/blogs',list)
router.post('/blogs-categories-tags',listAllBlogsCategoriesTags)
//!router.get('/blogs/:slug',read)
//!router.delete('/blogs/:slug',requireSignin,adminMiddleware,remove)
//!router.put('/blogs/:slug',requireSignin,adminMiddleware,update)

module.exports=router;
