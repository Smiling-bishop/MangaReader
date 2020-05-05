import React from 'react';
import {useSelector} from 'react-redux';

const Home = () => {
  const state = useSelector(state => state);
  console.log('Redux: ', state);
  return null;
};

export default Home;
