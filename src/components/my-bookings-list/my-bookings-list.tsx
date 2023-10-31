import { useAppSelector } from '../../hooks';
import MyBookingsCard from '../my-bookings-card/my-bookings-card';
import { getReservationQuests } from '../../store/reservations-data/reservations-data.selectors';

function MyBookingsList(): JSX.Element {
  const reservationQuests = useAppSelector(getReservationQuests);

  if (!reservationQuests.length) {
    return <p style={{textAlign: 'center', fontSize: 24}}>У Вас пока нет забронированных квестов</p>;
  }

  return (
    <div className="cards-grid">
      {reservationQuests.map((reservationQuest) => (
        <MyBookingsCard
          key={reservationQuest.id}
          reservationQuest={reservationQuest}
        />
      ))}
    </div>
  );
}

export default MyBookingsList;
