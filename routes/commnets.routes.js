const { createComment,getCommentById,getCommentsByPostId,deletecomment,updatecomment } = require("../controllers/comments.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");


const router = require('express').Router();

router.post('/create/:postId',verifyJWT,createComment)
router.get('/get/:postId',getCommentsByPostId)
router.get('/get/comment/:commentId',getCommentById)
router.put('/update/:commentId',verifyJWT,updatecomment)
router.delete('/delete/:commentId',verifyJWT,deletecomment)


module.exports=router