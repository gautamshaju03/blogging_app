import React, { useState, useContext, useEffect } from 'react';
import './CreatePost.css';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import { useNavigate, useParams } from "react-router-dom";

const initialPost = {
  title: '',
  description: '',
  username: '',
  createdDate: new Date()
}

const Update = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        } else {
          console.error('Error fetching post:', response.message);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchData();
  }, [id]);


  const updateBlogPost = async () => {
    try {
      const response = await API.updatePost({ ...post, id });
      if (response.isSuccess) {
        navigate(`/details/${id}`);
      } else {
        console.error('Error updating post:', response.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  return (
    <div className="create-blog-container">
      <h1>Edit Blog</h1>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={post.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Content</label>
        <textarea
          onChange={handleChange}
          name="description"
          value={post.description}
        />
      </div>
      <button onClick={updateBlogPost}>Update</button>
    </div>
  );
};

export default Update;
