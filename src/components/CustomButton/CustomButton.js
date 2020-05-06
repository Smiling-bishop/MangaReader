import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../CustomText';
import appStyles from '../../appStyles';

const CustomButton = {
  Dark: ({children, style, ...props}) => {
    return (
      <TouchableOpacity style={[styles.buttonContainer, style]} {...props}>
        <CustomText.Link>{children}</CustomText.Link>
      </TouchableOpacity>
    );
  },
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: appStyles.backgroundDarkColor,
    alignItems: 'center',
    borderRadius: 5
  },
});
export default CustomButton;
