import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import QuestInfo from '../../components/quest-info/quest-info';
import { fetchQuestAction } from '../../store/api-actions';
import { getQuest, getStatus } from '../../store/quest-data/quest-data.selectors';
import { Status } from '../../const';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const questId = String(id);
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getStatus) === Status.Loading;

  useEffect(() => {
    dispatch(fetchQuestAction(questId));
  }, [dispatch, questId]);

  if (!quest || isQuestLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <QuestInfo id={questId} />
        <Footer/>
      </div>
    </>
  );
}

export default QuestPage;
