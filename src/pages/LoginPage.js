import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-auth row">
      <h5 className="form-title">Авторизация</h5>
      <form className="  col s12" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username"
              type="text"
              className="validate"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="username">Имя пользователя</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
          </div>
        </div>
      </form>
      <button
        className="btn-auth btn waves-effect waves-light"
        type="submit"
        name="action"
        onClick={handleSubmit}
      >
        Войти
      </button>
      <Link to="/register">Нет аккаунта?</Link>
    </div>
  );
}

export default LoginPage;
