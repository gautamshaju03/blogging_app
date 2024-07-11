import React from 'react';
import { Box, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  if (!comment) {
    return null;
  }

  return (
    <div className="comment">
      <Box>
        <Typography>{comment.name}</Typography>
        <Typography>{comment.date ? new Date(comment.date).toDateString() : ''}</Typography>
      </Box>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </div>
  );
};

export default Comment;
