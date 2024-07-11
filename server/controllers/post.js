const Post = require("../models/post");

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        return res.status(200).send({ message: "Post saved successfully" });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).send({ message: "Please try again" });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).send({ message: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        console.log('Fetching post with ID:', req.params.id);
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json(error);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ isSuccess: false, message: 'Post not found' });
      }
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ isSuccess: true, message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error in deletePost:');
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  };
  

const searchPost = async (req, res) => {
    const { searchTerm } = req.body;

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } }
            ]
        });

        res.status(200).json(posts);
    } catch (err) {
        console.error('Error searching for posts:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    searchPost
};
