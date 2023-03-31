import { Routes, Route } from 'react-router-dom';

import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import RegisterPage from './pages/RegisterPage';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMe } from './redux/features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path=":id" element={<PostPage />} />
          <Route path=":id/edit" element={<EditPostPage />} />
          <Route path="new" element={<AddPostPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" hideProgressBar={true} />
    </div>
  );
}

export default App;
