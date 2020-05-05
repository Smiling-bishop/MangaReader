import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './redux';
import appStyles from './appStyles';

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <View style={styles.mainContainer} />
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: appStyles.mainColor,
    flex: 1,
  },
});

export default App;
