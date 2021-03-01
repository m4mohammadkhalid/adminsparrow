
const { check } = require('express-validator');

exports.userSignupRegister=[

    check('name').not().isEmpty().withMessage('Please Enter Name'),
    check('email').not().isEmpty().withMessage('Please Enter Email'),
    check('mobile').not().isEmpty().withMessage('Please Enter Number'),
    check('password').isLength({min:6}).withMessage('Password Six Max'),

];

exports.userSignin=[

    check('email').not().isEmpty().withMessage('Please Enter Email'),
    check('password').isLength({min:6}).withMessage('Password Six Max'),

];