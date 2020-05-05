import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import config from '../config';

//Redux-persist
const persistConfig = {
  key: 'NWMobileApp ' + config.version,
  storage: AsyncStorage,
};

let store;

if (__DEV__) {
  store = createStore(
    persistReducer(persistConfig, reducer),
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
} else {
  store = createStore(
    persistReducer(persistConfig, reducer),
    applyMiddleware(thunkMiddleware),
  );
}

const persistor = persistStore(store);
//config.ENV === "DEV" && persistor.purge(); //easier to do test

export {store, persistor, persistConfig};
