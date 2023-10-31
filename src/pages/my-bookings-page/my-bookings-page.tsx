import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getStatus } from '../../store/reservations-data/reservations-data.selectors';
import { fetchReservationQuestsAction } from '../../store/api-actions';
import Footer from '../../components/footer/footer';
import MyBookingsList from '../../components/my-bookings-list/my-bookings-list';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { Status } from '../../const';

function MyBookingsPage(): JSX.Element {
  const reservationQuestsStatus = useAppSelector(getStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReservationQuestsAction());
  }, [dispatch]);

  if (reservationQuestsStatus === Status.Loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
              />
              <img
                src="img/content/maniac/maniac-bg-size-m.jpg"
                srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
                width={1366}
                height={1959}
                alt=""
              />
            </picture>
          </div>
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="title title--size-m page-content__title">
                Мои бронирования
              </h1>
            </div>
            <MyBookingsList/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default MyBookingsPage;
