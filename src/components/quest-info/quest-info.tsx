import { Link, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import { AppRoute, AuthorizationStatus, LevelFilter, TypeFilter, Status } from '../../const';
import Loader from '../loader/loader';
import NotFoundPage from '../../pages/not-found-page/nout-found-page';
import { getQuest, getStatus } from '../../store/quest-data/quest-data.selectors';

type QuestInfoProps = {
  id: string;
}

function QuestInfo({id}: QuestInfoProps): JSX.Element {
  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getStatus) === Status.Loading;
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  if (!quest) {
    return <NotFoundPage />;
  }

  if (isQuestLoading) {
    return <Loader />;
  }

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${quest.coverImgWebp}, ${quest.coverImgWebp} 2x`}
          />
          <img
            src={quest.coverImg}
            srcSet={`${quest.coverImg} 2x`}
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {quest.title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{TypeFilter[quest.type]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {quest.peopleMinMax[0]}&ndash;{quest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {LevelFilter[quest.level]}
            </li>
          </ul>
          <p className="quest-page__description">
            {quest.description}
          </p>
          {isAuthorizationStatus === AuthorizationStatus.Auth
            ?
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={generatePath(AppRoute.Booking, { id: id.toString() })}
            >
              Забронировать
            </Link>
            :
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={AppRoute.Login}
            >
              Забронировать
            </Link>}
        </div>
      </div>
    </main>
  );
}

export default QuestInfo;
