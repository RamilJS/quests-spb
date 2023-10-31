import { Link } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import { logoutAction } from '../../store/api-actions';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Main}>
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Contacts}>
                Контакты
              </Link>
            </li>
            {isAuthorizationStatus === AuthorizationStatus.Auth &&
              <li className="main-nav__item">
                <Link className="link" to={AppRoute.MyBookings}>
                  Мои бронирования
                </Link>
              </li>}
          </ul>
        </nav>
        <div className="header__side-nav">
          {
            isAuthorizationStatus === AuthorizationStatus.Auth
              ?
              <Link
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }}
                className="btn btn--accent header__side-item" to={AppRoute.Login}
              >
            Выйти
              </Link>
              :
              <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>
                Вход
              </Link>
          }
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
