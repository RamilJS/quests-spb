import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBookingQuestsAction, fetchQuestAction } from '../../store/api-actions';
import { getBookingQuests, getBookingStatus } from '../../store/booking-data/booking-data.selectors';
import { getQuest, getStatus } from '../../store/quest-data/quest-data.selectors';
import Footer from '../../components/footer/footer';
import BookingMap from '../../components/map/booking-map';
import BookingForm from '../../components/booking-form/booking-form';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { Status } from '../../const';

function BookingPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const questLoadingStatus = useAppSelector(getStatus);
  const bookingLoadingStatus = useAppSelector(getBookingStatus);
  const bookingQuests = useAppSelector(getBookingQuests);
  const questId = useParams().id;
  const id = String(questId);

  useEffect(() => {
    dispatch(fetchQuestAction(id));
    dispatch(fetchBookingQuestsAction(id));
  }, [dispatch, id]);

  if (!quest || !bookingQuests || questLoadingStatus === Status.Loading || bookingLoadingStatus === Status.Loading || bookingLoadingStatus === Status.Inactive) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet={quest.coverImgWebp}
              />
              <img
                src={quest.coverImg}
                srcSet={quest.coverImg}
                width={1366}
                height={1959}
                alt=""
              />
            </picture>
          </div>
          <div className="container container--size-s">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle subtitle--size-l page-content__subtitle">
                Бронирование квеста
              </h1>
              <p className="title title--size-m title--uppercase page-content__title">
                {quest.title}
              </p>
            </div>
            {bookingQuests.length &&
            <>
              <div className="page-content__item">
                <BookingMap/>
              </div>
              <BookingForm/>
            </>}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default BookingPage;
