const Post = require('../models/Post');

// @desc    Create post
// @route   POST /api/posts
const createPost = async (req, res) => {
  const { title, content, excerpt, status } = req.body;
  const post = await Post.create({
    title,
    content,
    excerpt,
    status,
    author: req.user._id
  });
  res.status(201).json(post);
};

// @desc    Get all published posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({ status: 'published' })
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments({ status: 'published' });

  res.json({
    posts,
    page,
    pages: Math.ceil(total / limit),
    total
  });
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
const getPostBySlug = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug, status: 'published' },
    { $inc: { views: 1 } },
    { new: true }
  ).populate('author', 'name');

  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

// @desc    Update post
// @route   PUT /api/posts/:id
const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

// @desc    Like post
// @route   PUT /api/posts/:id/like
const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const index = post.likes.indexOf(req.user._id);
  if (index === -1) {
    post.likes.push(req.user._id);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json({ likes: post.likes.length });
};

module.exports = { createPost, getPosts, getPostBySlug, updatePost, deletePost, likePost };