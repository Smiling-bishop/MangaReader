import React from 'react';
import {View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

const SafeContainer = ({children}) => {
  const {
    top: marginTop,
    bottom: marginBottom,
    left: marginLeft,
    right: marginRight,
  } = useSafeArea();

  return (
    <View
      style={{
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        flex: 1,
      }}>
      {children}
    </View>
  );
};

export default SafeContainer;
