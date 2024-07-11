const express = require("express");
const { signupUser, loginUser } = require("../controllers/user");
const { createPost, getPosts, getPost, updatePost, deletePost, searchPost } = require("../controllers/post");
const { authenticateToken } = require("../controllers/jwt");
const { newComment, getComments } = require("../controllers/comment");
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/create',authenticateToken, createPost);
router.get('/posts', authenticateToken, getPosts);
router.get('/post/:id', authenticateToken, getPost);
router.patch('/update/:id', authenticateToken, updatePost); 
router.delete('/delete/:id', authenticateToken, deletePost);
router.get('/search', authenticateToken, searchPost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);


module.exports = router;
