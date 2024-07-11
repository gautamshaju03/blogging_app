import React, { useEffect, useState } from 'react';
import { API } from '../../service/api';
import Post from './Post';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.getPosts();
        if (res.isSuccess) {
          const sortedPosts = res.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          setPosts(sortedPosts);
        } else {
          console.error('Error fetching posts:', res.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
