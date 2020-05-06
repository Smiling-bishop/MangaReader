import React from 'react';
import {Text, StyleSheet} from 'react-native';
import appStyles from '../../appStyles';

const CustomText = {
  Header: ({children, style, ...props}) => (
    <Text style={[styles.header, style]} {...props}>
      {children}
    </Text>
  ),
  Header2: ({children, style, ...props}) => (
    <Text style={[styles.header2, style]} {...props}>
      {children}
    </Text>
  ),
  Simple: ({children, style, ...props}) => (
    <Text style={[styles.simple, style]} {...props}>
      {children}
    </Text>
  ),
  Description: ({children, style, ...props}) => (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  ),
  Link: ({children, style, ...props}) => (
    <Text style={styles.link} {...props}>
      {children}
    </Text>
  ),
};

const styles = StyleSheet.create({
  header: {
    color: appStyles.activeColor,
    fontSize: 24,
    fontWeight: '500',
  },
  header2: {
    color: appStyles.secondaryColor,
    fontSize: 20,
    fontWeight: '500',
  },
  simple: {
    color: appStyles.secondaryColor,
    fontSize: 16,
  },
  description: {
    color: appStyles.disableColor,
    fontSize: 14,
  },
  link: {
    color: appStyles.activeColor,
    fontSize: 16,
  },
});

export default CustomText;
