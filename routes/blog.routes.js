const { createBlogPost,getAllBlogPosts ,getBlogPostById,deleteBlogPost,updateBlogPost} = require("../controllers/blogs.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");



const router = require('express').Router();

router.post('/create',verifyJWT,createBlogPost)
router.get('/get/:id',getBlogPostById)
router.get('/all',getAllBlogPosts)
router.put('/update/:id',verifyJWT,updateBlogPost)
router.delete('/delete/:id',verifyJWT,deleteBlogPost)


module.exports=router
