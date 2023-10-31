import { Helmet } from 'react-helmet-async';
import { useLocation, generatePath, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getQuest } from '../../store/quest-data/quest-data.selectors';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import Footer from '../../components/footer/footer';
import LoginPageHeader from '../../components/header/login-page-header';
import LoginForm from '../../components/login-form/login-form';
import { AuthorizationStatus, AppRoute } from '../../const';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const quest = useAppSelector(getQuest);
  const location = useLocation();

  const route = quest && location.state ? generatePath(AppRoute.Booking, { id: quest.id }) : AppRoute.Main;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={route} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <LoginPageHeader/>
        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
              />
              <img
                src="img/content/maniac/maniac-size-m.jpg"
                srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
                width={1366}
                height={768}
                alt=""
              />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="login__form">
              <LoginForm />
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default LoginPage;
