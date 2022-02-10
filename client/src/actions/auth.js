import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data})
    navigate('/')
  } catch (error) {
    console.log(error)
  }

}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data})
    
    navigate('/')
  } catch (error) {
    console.log(error)
  }

}

// export const getPosts = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchPosts();

//     dispatch({ type: FETCH_ALL, payload: data })
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.createPost(post);

//     dispatch({ type: CREATE, payload: data })
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// export const updatePost = (id, postData) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, postData);

//     dispatch({ type: UPDATE, payload: data })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await api.deletePost(id);

//     dispatch({ type: DELETE, payload: id })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const likePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data })
//   } catch (error) {
//     console.log(error)
//   }
// }