import { configureStore } from '@reduxjs/toolkit';
import authSlise from './features/auth/authSlice';
import commentSlice from './features/comments/commentSlice';
import postSlice from './features/posts/postSlice';

export const store = configureStore({
  reducer: {
    auth: authSlise,
    post: postSlice,
    comment: commentSlice,
  },
});
