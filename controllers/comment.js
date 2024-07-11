const Comment = require('../models/comment');

const newComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(200).json({ msg: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = { newComment, getComments };
