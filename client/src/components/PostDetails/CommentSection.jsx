import React, { useState, useRef} from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    const newComment = `${user.result.name}: ${comment}`
    const newComments = await dispatch(commentPost(newComment, post._id));

    setComments(newComments);
    setComment('');
  }


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              {comment}
            </Typography>
          )) }
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%'}}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField 
              fullWidth
              rows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
              Post comment
            </Button>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default CommentSection