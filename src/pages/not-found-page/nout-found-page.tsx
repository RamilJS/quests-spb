import { Helmet } from 'react-helmet-async';
import styles from './not-found-page.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header/>
      <div className={`page ${styles.notFoundPage}`}>
        <Helmet>
          <title>Escape Room: 404</title>
        </Helmet>
        <h1 className={styles.title}>Error 404
          <br />
          <small>Page not found</small>
        </h1>
      </div>
      <Footer/>
    </>
  );
}

export default NotFoundPage;
