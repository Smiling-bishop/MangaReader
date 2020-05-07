import makeModule from './helper';
import apiMangaEden from '../../api/apiMangaEden';
import axios from 'axios';

const initialState = {
  mangas: [],
  waitingList: [],
  favorites: [],
  lastUpdate: 0,
  updating: false,
  loading: false,
};

const handlers = {
  setLatestRead: (state, {mangaId, chapterId}) => {
    let mangas = [...state.mangas];
    mangas[mangaId].latestRead = chapterId;
    return {...state, mangas};
  },
};

const handlersAsync = {
  getMangas: {
    apiCall: apiMangaEden.apiCalls.listOfMangas,
    request: state => {
      return {
        ...state,
        updating: true,
      };
    },
    success: (state, mangas) => {
      return {
        ...state,
        mangas,
        updating: false,
      };
    },
    error: (state, error) => {
      return {
        ...state,
        updating: false,
      };
    },
  },
  getManga: {
    apiCall: apiMangaEden.apiCalls.mangaInformation,
    request: state => {
      return {
        ...state,
        loading: true,
      };
    },
    success: (state, {mangaId, details}) => {
      let mangas = [...state.mangas];
      let pos = mangas.findIndex(({id}) => id === mangaId);
      if (pos >= 0) {
        mangas[pos] = {
          ...mangas[pos],
          ...details,
        };
      }

      return {
        ...state,
        mangas,
        loading: false,
      };
    },
    error: (state, error) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
  getChapter: {
    apiCall: apiMangaEden.apiCalls.chapterInformation,
    request: state => {
      return {
        ...state,
        loading: true,
      };
    },
    success: (state, {mangaId, chapterId, pages}) => {
      let mangas = [...state.mangas];
      let pos = mangas.findIndex(({id}) => id === mangaId);
      if (pos >= 0) {
        let posChapter = mangas[pos].chapters.findIndex(
          ({id}) => id === chapterId,
        );
        mangas[pos].chapters[posChapter].pages = pages;
      }

      return {
        ...state,
        mangas,
        loading: false,
      };
    },
    error: (state, error) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
};

const {reducer, actions} = makeModule(
  'mangaEden',
  initialState,
  handlers,
  handlersAsync,
);

export default reducer;
export {actions};
