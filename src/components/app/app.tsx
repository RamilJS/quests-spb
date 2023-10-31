import { Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import browserHistory from '../../browser-history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MainCatalog from '../../pages/main-catalog/main-catalog';
import LoginPage from '../../pages/login-page/login-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import QuestPage from '../../pages/quest-page/guest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyBookingsPage from '../../pages/my-bookings-page/my-bookings-page';
import NotFoundPage from '../../pages/not-found-page/nout-found-page';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';
import { checkAuthAction } from '../../store/api-actions';
import { getFetchStatus } from '../../store/user-data/user-data.selectors';
import { AppRoute, Status } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getFetchStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (fetchStatus === (Status.Loading || Status.Inactive)) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainCatalog />}
          />
          <Route
            path={AppRoute.QuestInfo}
            element={<QuestPage />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage />}
          />
          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.MyBookings}
            element={
              <PrivateRoute>
                <MyBookingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
