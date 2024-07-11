import React, { useState } from 'react';

const calculateReadingTime = (text) => {
  const wordsPerMinute = 300;
  const words = text.split(' ').length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
};

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const readingTime = calculateReadingTime(post.description);

  return (
    <div className="blogs" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
      <div className="blog-item">
        <div className="blog-details">
          <h2>{post.title}</h2>
          <p>Author: {post.username}</p>
          <p>Reading Time: {readingTime} min</p>
          <p>
            {isExpanded ? post.description : `${post.description.substring(0, 200)}...`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
