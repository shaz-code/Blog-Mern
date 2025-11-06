const express = require('express');
const { createPost, getPosts, getPostBySlug, updatePost, deletePost, likePost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);

module.exports = router;