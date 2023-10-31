import { useAppSelector } from '../../hooks';
import { Quest } from '../../types/quest';
import { getStatus } from '../../store/quests-data/quests-data.selectors';
import QuestCard from '../quest-card/quest-card';
import Loader from '../loader/loader';
import { Status } from '../../const';

type QuestListProps = {
  quests: Quest[];
}

function QuestList({quests}: QuestListProps): JSX.Element {
  const questsLoadingStatus = useAppSelector(getStatus);

  if (questsLoadingStatus === Status.Loading) {
    return <Loader />;
  }
  if(!quests.length) {
    return <p style={{textAlign: 'center', fontSize: 24}}>Квесты не найдены</p>;
  }

  return (
    <div className="cards-grid">
      {
        quests.map((quest) => (
          <QuestCard
            key={quest.id}
            id={quest.id}
            title={quest.title}
            previewImg={quest.previewImg}
            previewImgWebp={quest.previewImgWebp}
            level={quest.level}
            peopleMinMax={quest.peopleMinMax}
          />
        ))
      }
    </div>
  );
}

export default QuestList;
