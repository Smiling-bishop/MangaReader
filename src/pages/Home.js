import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux/reducer/mangaEden';

const Home = () => {
  const mangas = useSelector(state => state.mangaEden.mangas);
  const dispatch = useDispatch();

  console.log('Redux: ', mangas);
  React.useEffect(() => {
    // dispatch(actions.getMangas("));
    // dispatch(actions.getManga('4e70ea10c092255ef7004aa2'));
    // dispatch(actions.getChapter('4e70ea10c092255ef7004aa2', "5ea2b8b4719a16656f960fce"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

export default Home;
