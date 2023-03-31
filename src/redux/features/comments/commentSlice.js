//Операции GRUD с комментами - создание поста, удаление поста, получение всех постов
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  comments: [],
  loading: false,
};
//функция создания коммента
export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/api/comments/${postId}`, {
        postId,
        comment,
      });

      return data; //возвращает коммент из БД
    } catch (error) {
      console.log(error);
    }
  }
);
//функция получения всех комментов конкретного пользователя
export const getComments = createAsyncThunk('comment/getComments', async (postId) => {
  try {
    const { data } = await axios.get(`/api/comments/list/${postId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    //создание коммента
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false;
    },
    //получение комментов
    [getComments.pending]: (state) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default commentSlice.reducer;
