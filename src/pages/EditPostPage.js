import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { REACT_APP_URL } from '../utils/axios';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { editOnePost } from '../redux/features/posts/postSlice';

function EditPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //функция получения поста из БД по его id
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setImageUrl(data.imageUrl);
  }, [params.id]);

  //функция получения картинки
  const clickImageHandler = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };
  //функция обновления после редактирования всего поста
  const submitHandler = async () => {
    try {
      const fields = {
        _id: params.id,
        title,
        text,
        imageUrl,
      };
      console.log(params); //id: "64148ca80b1c970f4ade9007"
      //await axios.patch(`/api/posts/${fields._id}/edit`, fields);
      dispatch(editOnePost(fields));
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };
  //функция отмены вставки изображения
  const deleteImg = () => {
    setImageUrl('');
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div>
      <form className="form-add-post" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="file-field input-field">
            <div className="btn">
              <span>Добавьте изображение поста</span>
              <input type="file" onChange={clickImageHandler} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div className="post-img">
          <img src={`${process.env.REACT_APP_URL}${imageUrl}`} alt="" />
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="active" htmlFor="title">
              Название поста
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              className="materialize-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <label className="active" htmlFor="textarea1">
              Добавьте текст поста
            </label>
          </div>
        </div>

        <div className="post-buttons">
          <button
            onClick={submitHandler}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Изменить
          </button>
          <button
            onClick={deleteImg}
            className="btn waves-effect red lighten-2"
            type="submit"
            name="action"
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostPage;
