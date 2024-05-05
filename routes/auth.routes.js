const {register,login,getloggedinuser}=require('../controllers/auth.controllers')
const { verifyJWT } = require("../middleware/verify.middleware");

const router = require('express').Router();

router.post('/register',register)
router.post('/login',login)
router.get('/loggedinuser',verifyJWT,getloggedinuser)

module.exports=router