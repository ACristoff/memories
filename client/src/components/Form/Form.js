import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
// import moment from 'moment';

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts.js";


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
    // createdAt: ''
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
  const dispatch = useDispatch();
  const classes = useStyles(); 
  const user = JSON.parse(localStorage.getItem('profile'))


  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(null)
    setPostData({...postData, title: '', message: '', tags: '', selectedFile: '' });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      clear();
    } else {
      // setPostData({...postData, createdAt: moment()});
      dispatch(createPost({...postData, name: user?.result?.name}));
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }


  return (

    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> {!currentId ? 'Creating' : 'Editing'} a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => setPostData({...postData, title: event.target.value})} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => setPostData({...postData, message: event.target.value})} />
        <TextField name="tags" variant="outlined" label="Tags (comma seperated)" fullWidth value={postData.tags} onChange={(event) => setPostData({...postData, tags: event.target.value.split(',')})} />
        <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} /> </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        
      </form>
    </Paper>
  )
}

export default Form