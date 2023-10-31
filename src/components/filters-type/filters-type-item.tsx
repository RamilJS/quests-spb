import { ChangeEvent } from 'react';
import { chooseType } from '../../store/quests-filter-data/quests-filter.slice';
import { getType } from '../../store/quests-filter-data/quests-filter.selectors';
import { TypeFilter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';

type FiltersTypeItemProps = {
  type: string;
}

function FiltersTypeItem({type}: FiltersTypeItemProps): JSX.Element {
  const activeType = useAppSelector(getType);
  const dispatch = useAppDispatch();
  const iconType = (Object.keys(TypeFilter) as (keyof typeof TypeFilter)[]).find((key) => TypeFilter[key] === type);
  const icon = `#icon-${iconType as string}` ;
  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    dispatch(chooseType(type));
  };

  return (
    <li className="filter__item">
      <input type="radio" name="type" id={type} checked={activeType === type} onChange={handleChange} />
      <label className="filter__label" htmlFor={type}>
        <svg
          className="filter__icon"
          width={26}
          height={30}
          aria-hidden="true"
        >
          <use xlinkHref={icon} />
        </svg>
        <span className="filter__label-text">{type}</span>
      </label>
    </li>
  );
}

export default FiltersTypeItem;
