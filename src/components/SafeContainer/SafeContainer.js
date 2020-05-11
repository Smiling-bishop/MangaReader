import React from 'react';
import {View, Alert} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

const SafeContainer = ({style, children, ...props}) => {
  const {
    top: marginTop,
    bottom: marginBottom,
    left: marginLeft,
    right: marginRight,
  } = useSafeArea();

  return (
    <View
      style={[
        {
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          flex: 1,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

export default SafeContainer;
