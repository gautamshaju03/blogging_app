import React, { useState, useContext } from 'react';
import './CreatePost.css';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const initialPost = {
    title: "",
    description: "",
    username: account.username || "",
    createdDate: new Date().toISOString()
  };

  const [post, setPost] = useState(initialPost);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    if (!post.title || !post.description) {
      alert("Title and Description are required.");
      return;
    }
    try {
      const res = await API.createPost(post);
      if (res.isSuccess) {
        navigate('/'); // Navigate to homepage or success page
      } else {
        alert(res.message || "An error occurred while creating the post.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create New Blog</h1>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Enter blog title"
          onChange={handleChange}
          name="title"
          value={post.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Content</label>
        <textarea
          placeholder="Write your blog here"
          onChange={handleChange}
          name="description"
          value={post.description}
        />
      </div>
      <button onClick={savePost}>Publish</button>
    </div>
  );
};

export default CreatePost;
