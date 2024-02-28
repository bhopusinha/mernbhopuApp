const express=require('express');
const router=express.Router();
const { userRegister, userLogin, getUserDetail, userLogout } = require('../controller/userController');
const {isAuthenticate} =require('../middleware/auth');



router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/me').get(isAuthenticate,getUserDetail);
router.route('/logout').get(userLogout);

module.exports=router;