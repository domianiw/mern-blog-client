import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from '../redux/features/auth/authSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const isAuth = useSelector(checkAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuBurger, setMenuBurger] = useState('menu__list');
  const [isClickActive, setIsClickActive] = useState(true);

  const activeMenuHandler = () => {
    if (isClickActive) {
      setMenuBurger('menu__list menu__list--active');
      setIsClickActive(false);
    } else {
      setMenuBurger('menu__list');
      setIsClickActive(true);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');

    toast('Вы вышли из системы');
  };

  return (
    <div>
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Posts MERN
            </Link>

            <div className="menu__btn" onClick={activeMenuHandler}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {isAuth && (
              <div>
                <ul className={menuBurger} onClick={activeMenuHandler}>
                  <li>
                    <NavLink to="/">Главная</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts">Мои посты</NavLink>
                  </li>
                  <li>
                    <NavLink to="/new">Добавить пост</NavLink>
                  </li>
                </ul>
              </div>
            )}

            {isAuth ? (
              <button
                onClick={logoutHandler}
                className="nav-btm waves-effect waves-light btn-large"
                type="submit"
              >
                Выйти
              </button>
            ) : (
              <Link to="/login">
                <button className="nav-btm waves-effect waves-light btn-large" type="submit">
                  Войти
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
