//авторизация пользователя
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};
//функция регистрации пользователя
//registerUser будет использоваться в RegisterPage.js
export const registerUser = createAsyncThunk(
  '/auth/registerUser',
  async ({ username, password }) => {
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        password,
      });
      if (res.data.token) {
        window.localStorage.setItem('token', res.data.token);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//функция авторизации пользователя
//loginUser будет использоваться в LoginPage.js
export const loginUser = createAsyncThunk('/auth/loginUser', async ({ username, password }) => {
  try {
    const res = await axios.post('/api/auth/login', {
      username,
      password,
    });
    if (res.data.token) {
      window.localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

//Функция проверки пользователя
//getMe будет использоваться в App.js - вызывается при каждой перезагрузке страницы
export const getMe = createAsyncThunk('/auth/getMe', async () => {
  try {
    const res = await axios.get('/api/auth/me');
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },

  extraReducers: {
    // обработка данныых при регистрации пользователя
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message; //action.payload.message - значение message, которое возвращается на фронтэнде в файле controller.auth.js
      state.user = action.payload.newUser;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // обработка данных при авторизации пользователя
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //проверка пользователя
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null; //запрос делаем при каждом обновлении страницы null чтобы не появлялись тосты
      state.user = action.payload?.user; //изменяем state.user только при наличии ответа с фронта (у user есть токен)
      //state.token = action.payload?.token;
    },
  },
});

export const checkAuth = (state) => Boolean(state.auth.user); //если есть токен - true
export const { logout } = authSlise.actions;
export default authSlise.reducer;
