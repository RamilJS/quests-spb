import { LevelFilter } from '../../const';
import FiltersLevelItem from './filters-levels-item';

function FiltersLevelList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {Array.from(Object.values(LevelFilter)).map((level) => (
          <FiltersLevelItem level={level} key={level}/>
        ))}
      </ul>
    </fieldset>
  );
}

export default FiltersLevelList;
