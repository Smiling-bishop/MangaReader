import {combineReducers} from 'redux';
import mangaEden from './mangaEden';

const appReducer = combineReducers({
  mangaEden,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
