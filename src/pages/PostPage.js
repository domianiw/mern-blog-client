import { useCallback, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveRedEye, MdOutlineMessage, MdDelete, MdModeEdit } from 'react-icons/md';
import axios from '../utils/axios';
//import { REACT_APP_URL } from '../utils/axios'; //url сервера
//import { server } from '../utils/axios'; //url сервера
//import Moment from 'react-moment';
import { deleteOnePost } from '../redux/features/posts/postSlice';
import { checkAuth } from '../redux/features/auth/authSlice';

import { createComment, getComments } from '../redux/features/comments/commentSlice';
import CommentItem from '../components/CommentItem';
import { toast } from 'react-toastify';

function PostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.auth); //вытаскиваем data авторизованного пользователя из redux
  const { comments } = useSelector((state) => state.comment);
  const isAuth = useSelector(checkAuth);

  const textAreaRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //функция при клику на иконку с корзиной удаляет пост
  const clickHandler = () => {
    try {
      dispatch(deleteOnePost(params.id));
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };
  //функция при нажатии на кнопку Отправить создает коммент в БД

  const submitCommentHandler = () => {
    try {
      if (isAuth) {
        const postId = params.id;
        dispatch(createComment({ postId, comment }));
        setComment('');
      } else {
        toast('Коммент только авторизованным');
        setComment('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //функция получает все посты из БД по конкретному пользователю
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/api/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  //функция получает комменты из БД по конкретному посту
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  //функция уменьшает высоту textarea после удаления текста
  const resizeTextArea = useCallback(async () => {
    textAreaRef.current.style.height = '20px';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, []);

  //вызывает функцию fetchPost() при переходе на страницу с одним постом (т.к изменился стэйт post который зависит от id в командной строке)
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  //вызывает функцию fetchCmments() при переходе на страницу с одним постом (т.к изменился стэйт post который зависит от id в командной строке)
  useEffect(() => {
    fetchComments();
  }, [fetchComments, isAuth]);
  //вызывает функцию resizeTextArea() при отправке коммента (т.к. изменяется стэйт сomment)
  useEffect(() => {
    resizeTextArea();
  }, [resizeTextArea, comment]);

  if (!post) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="post-page">
      <div className="container">
        <Link to={'/'}>
          <button className="btn-back btn-auth btn waves-effect waves-light" type="button">
            Назад
          </button>
        </Link>
        <div className="main__inner">
          <div className="main-post-one">
            <div className="post-item">
              <div className="post-page-image">
                {post.imageUrl && (
                  <img src={`${process.env.REACT_APP_URL}${post.imageUrl}`} alt="" />
                )}
              </div>
              <div className="post-info">
                <p className="post-author">{post.username}</p>
                <p className="post-data">
                  {/* <Moment date={post.createdAt} format="D MMM YYYY" /> */}
                </p>
              </div>

              <h4 className="post-title">{post.title}</h4>
              <p className="post-text">{post.text}</p>
              <div className="post-icons">
                <div className="post-view">
                  <button className="btn-icon">
                    <MdRemoveRedEye />
                  </button>
                  <span>{post.vievs}</span>
                  <button className="btn-icon">
                    <MdOutlineMessage />
                  </button>
                  <span>{post.comments.length || 0}</span>
                </div>

                {user?._id === post.author && ( //сравниваем авторизованного пользователя и автора статьи
                  <div className="post-edit">
                    <button className="btn-icon">
                      <Link to={`/${params.id}/edit`}>
                        <MdModeEdit />
                      </Link>
                    </button>

                    <button onClick={clickHandler} className="btn-icon">
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="post-comments">
            <form onClick={(e) => e.preventDefault()} className="comment-form col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    ref={textAreaRef}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    id="comment"
                    className="materialize-textarea"
                  ></textarea>
                  <label htmlFor="comment">КОММЕНТАРИИ</label>
                </div>
              </div>

              <button
                onClick={submitCommentHandler}
                className="btn-comment btn-auth btn waves-effect waves-light"
                type="submit"
              >
                Отправить
              </button>
            </form>

            {comments?.map((item, index) => (
              <CommentItem key={index} comit={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
