//handlers for routes, logic gets put in here

import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    console.log(postMessages)

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  
  try {
    await newPost.save();
 
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that id. id: ${_id}`)

  
  // { ...post, _id},
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

  console.log('a post has been updated')

  res.json(updatedPost);
}


export const deletePost = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id. id: ${id}`)

  await PostMessage.findByIdAndRemove(id)

  res.json({ message: 'Post delted succesfully'})
}

export const likePost = async (req, res) => {

  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id. id: ${id}`);

  const post = await PostMessage.findById(id);
  const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

  console.log(`the post ${id} has been liked`);
   
  res.json(likedPost);
}