import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestsAction } from '../../store/api-actions';
import { getQuests } from '../../store/quests-data/quests-data.selectors';
import { getLevel, getType } from '../../store/quests-filter-data/quests-filter.selectors';
import useFilter from '../../hooks/use-filter';
import QuestList from '../../components/quest-list/quest-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FiltersTypeList from '../../components/filters-type/filters-type-list';
import FiltersLevelList from '../../components/filters-level/filters-level-list';
import { LevelFilter, TypeFilter } from '../../const';

function MainCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const quests = useAppSelector(getQuests);
  const activeType = useAppSelector(getType);
  const activeLevel = useAppSelector(getLevel);
  const filteredQuests = useFilter(quests, activeType, activeLevel);

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle page-content__subtitle">
                квесты в Санкт-Петербурге
              </h1>
              <h2 className="title title--size-m page-content__title">
                Выберите тематику
              </h2>
            </div>
            <div className="page-content__item">
              <form className="filter" action="#" method="get">
                <FiltersTypeList/>
                <FiltersLevelList/>
              </form>
            </div>
            <h2 className="title visually-hidden">Выберите квест</h2>
            {activeType === TypeFilter['all-types'] && activeLevel === LevelFilter.any
              ? <QuestList quests={quests} />
              : <QuestList quests={filteredQuests}/>}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default MainCatalog;
