//Операции GRUD с постами - создание поста, удаление поста, получение всех постов
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

//функция создания постов
//params это fields из файла AddPostPage.js
//async (params) - в скобках то, что будет в теле запроса (то, что ожидает controller на бэкэнде)
export const createPost = createAsyncThunk('/post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/api/posts', params); //{title: '8', text: '8', imageUrl: '', vievs: 0, author: '64089b8b261f3251f3eebf4b', …}
    return data;
  } catch (error) {
    console.log(error);
  }
});
//функция получения всех постов
export const getAllPosts = createAsyncThunk('/post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/api/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});
//функция удаления поста
export const deleteOnePost = createAsyncThunk('post/deleteOnePost', async (id) => {
  try {
    const { data } = await axios.delete(`/api/posts/${id}`, id);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
//функция редактирования поста
export const editOnePost = createAsyncThunk('post/editOnePost', async (fields) => {
  try {
    const { data } = await axios.patch(`/api/posts/${fields._id}/edit`, fields);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    //создание поста
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload); //action.payload - все, что входит в res.json(post)  (newPost из файла controller.post)
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
    },
    //получение всех постов
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts; //посты, которые приходят с бэкэнда
      state.popularPosts = action.payload.popularPosts; //популярные посты, которые приходят с бэкэнда
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
    },
    //удаление поста
    [deleteOnePost.pending]: (state) => {
      state.loading = true;
    },
    [deleteOnePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.post.filter((post) => post._id !== action.payload._id);
    },
    [deleteOnePost.rejected]: (state, action) => {
      state.loading = false;
    },
    //редактирование поста
    [editOnePost.pending]: (state) => {
      state.loading = true;
    },
    [editOnePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [editOnePost.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
