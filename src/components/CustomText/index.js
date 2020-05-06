import React from 'react';
import {Text, StyleSheet} from 'react-native';
import appStyles from '../../appStyles';

const CustomText = {
  Header: ({children, ...props}) => (
    <Text style={styles.header} {...props}>
      {children}
    </Text>
  ),
  Simple: ({children, ...props}) => (
    <Text style={styles.simple} {...props}>
      {children}
    </Text>
  ),
};

const styles = StyleSheet.create({
  header: {
    color: appStyles.secondaryColor,
    fontSize: 24,
    fontWeight: '500',
  },
  simple: {
    color: appStyles.secondaryColor,
    fontSize: 16,
  },
});

export default CustomText;
