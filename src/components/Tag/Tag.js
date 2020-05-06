import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../CustomText';
import appStyles from '../../appStyles';

const Tag = ({style, children, onPress}) => (
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress}
    disabled={!onPress}>
    <CustomText.Description style={styles.text}>
      {children}
    </CustomText.Description>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 'auto',
    backgroundColor: appStyles.backgroundDarkColor,
    borderRadius: 5,
  },
  text: {
    color: appStyles.secondaryColor,
    fontSize: 12,
  },
});

export default Tag;
