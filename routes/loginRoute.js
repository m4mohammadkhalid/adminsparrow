const express=require('express');
const router=express.Router();
const {login,signout,requireSignin}=require('../controllers/loginController');
const {runValidator}=require('../validator/index')
const {userSignin}=require('../validator/auth')

router.post('/signin',userSignin,runValidator ,login)
router.get('/logout',signout)

// router.get('/secret',requireSignin,(request,response)=>{
//         response.json({
//              user:request.user
//         });
// });



module.exports=router;