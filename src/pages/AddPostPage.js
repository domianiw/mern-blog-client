import axios from '../utils/axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/posts/postSlice';
//import { REACT_APP_URL } from '../utils/axios';
//import { server } from '../utils/axios';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickImageHandler = async (e) => {
    try {
      const formData = new FormData(); //const formData - данные из инпута, которые будем передавать в теле post-запроса
      //console.log(e.target.files);//FileList {0: File, length: 1}
      const file = e.target.files[0]; //все данные по картинке
      formData.append('image', file); //добавляем в formData ключ 'image' со значением file
      const { data } = await axios.post('/uploads', formData); //data зашита в ответе сервера
      setImageUrl(data.url);
      //console.log(data); //{url: '/uploads/1678442395877--images.jpg'}
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
      };

      dispatch(createPost(fields)); //вызываем функцию создания постов createPost
      navigate('/'); //переходим на главную после создания поста
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImg = () => {
    setImageUrl('');
  };

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
            <label htmlFor="title">Название поста</label>
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
            <label htmlFor="textarea1">Добавьте текст поста</label>
          </div>
        </div>

        <div className="post-buttons">
          <button
            onClick={submitHandler}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Добавить
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

export default AddPostPage;
