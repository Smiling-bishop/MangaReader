import React from 'react';
import {View} from 'react-native';

const Margin = {
  // eslint-disable-next-line react-native/no-inline-styles
  Horizontal: ({width}) => <View style={{height: 1, width}} />,
  // eslint-disable-next-line react-native/no-inline-styles
  Vertical: ({height}) => <View style={{height, width: 1}} />,
};

export default Margin;
