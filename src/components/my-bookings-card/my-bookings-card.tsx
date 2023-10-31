import { Link, generatePath } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { deleteReservationQuestAction } from '../../store/api-actions';
import { ReservationQuest } from '../../types/booking';
import { AppRoute, LevelFilter, SlotName } from '../../const';

type ReservationQuestCardProps = {
  reservationQuest: ReservationQuest;
};

function MyBookingsCard({reservationQuest}: ReservationQuestCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteReservationQuestAction(reservationQuest.id));
  };

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={reservationQuest.quest.previewImgWebp}
          />
          <img
            src={reservationQuest.quest.previewImg}
            srcSet={reservationQuest.quest.previewImgWebp}
            width={344}
            height={232}
            alt={reservationQuest.quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={generatePath(AppRoute.QuestInfo, { id: `${reservationQuest.quest.id}` })}>
            {reservationQuest.quest.title}
          </Link>
          <span className="quest-card__info">
            {`${(SlotName[reservationQuest.date])}, ${reservationQuest.time}. ${reservationQuest.location.address}`}
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {reservationQuest.peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {LevelFilter[reservationQuest.quest.level]}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={handleClick}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default MyBookingsCard;
