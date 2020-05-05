import makeModule from './helper';

const initialState = {
  mangas: [],
  lastUpdate: 0,
  updating: false,
};

const handlers = {};

const handlersAsync = {};

const {reducer, actions} = makeModule(
  'mangaEden',
  initialState,
  handlers,
  handlersAsync,
);

export default reducer;
export {actions};
