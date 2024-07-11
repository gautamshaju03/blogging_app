import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SendIcon from '@mui/icons-material/Send';
import './Comments.css';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const initialValues = {
  name: '',
  postId: '',
  comments: '',
  date: new Date()
};

const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const { account } = useContext(DataContext);
  const { id } = useParams();

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await API.getComments(id);
        if (res.isSuccess) {
          setComments(res.data);
        } else {
          console.error('Error fetching comments:', res.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };
    getData();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment.comments.trim()) return; // Prevent empty comments
    try {
      let res = await API.newComment(comment);
      if (res.isSuccess) {
        setComment(initialValues);
        let updatedComments = await API.getComments(id);
        if (updatedComments.isSuccess) {
          setComments(updatedComments.data);
        }
      } else {
        console.error('Error adding comment:', res.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={addComment} className="comment-input-section">
        <AccountCircleRoundedIcon className="comment-icon" />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="comment-input"
          value={comment.comments}
          onChange={handleChange}
        />
        <button type="submit" className="post-button">
          <SendIcon />
        </button>
      </form>
      <div className="comments-list">
        {comments && comments.length > 0 ? (
          comments.map((commentItem, index) => (
            <Comment key={index} comment={commentItem} />
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;