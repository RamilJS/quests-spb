import FiltersTypeItem from './filters-type-item';
import { TypeFilter } from '../../const';

function FiltersTypeList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        {Array.from(Object.values(TypeFilter)).map((type) => (
          <FiltersTypeItem type={type} key={type} />
        ))}
      </ul>
    </fieldset>
  );
}

export default FiltersTypeList;
