import { useEffect, useState, useContext } from 'react';
import './detailView.css';
import { API } from '../../service/api';
import Comments from './comments/Comments';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.getPostById(id);
        if (res.isSuccess) {
          setPost(res.data);
        } else {
          console.error('Error fetching post:', res.message);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    try {
      const res = await API.deletePost({id});
      if (res.isSuccess) {
        console.log('Post deleted successfully');
        navigate("/");
      } else {
        console.error('Error deleting post:', res.message);
        alert(`Failed to delete post: ${res.message}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      alert(`An error occurred while deleting the post: ${error.message}`);
    }
  };

  return (
    <>
      <div className="blog-post">
        <div className="post-header">
          <h1>{post.title}</h1>
          {post.username === account.username && (
            <div className="actions">
              <Link to={`/update/${post._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button onClick={deleteBlog} className="delete-button">Delete</button>
            </div>
          )}
          <p className="author">Author: {post.username || account.username}</p>
          <p className="date">Published on: {new Date(post.createdDate).toDateString()}</p>
        </div>
        <div className="post-content">
          <h3>Content</h3>
          <p>{post.description}</p>
        </div>
        <button className="home-button" onClick={() => navigate('/')}>Home</button>
      </div>
      <div className="comments">
        <Comments post={post} />
      </div>
    </>
  );
};

export default DetailView;
