import { Link, generatePath } from 'react-router-dom';
import { AppRoute, LevelFilter, QuestLevel } from '../../const';

type QuestCardProps = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  peopleMinMax: [number, number];
}

function QuestCard({id, title, previewImg, previewImgWebp, level, peopleMinMax}: QuestCardProps): JSX.Element {
  return (
    <div
      className="quest-card"
    >
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp}
          />
          <img
            src={previewImg}
            srcSet={previewImgWebp}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={generatePath(AppRoute.QuestInfo, { id: id.toString() })}
          >
            {title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {LevelFilter[level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
