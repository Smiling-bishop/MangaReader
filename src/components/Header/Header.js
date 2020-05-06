import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import assets from '../../assets';
import CustomText from '../CustomText';
import config from '../../config';
import appStyles from '../../appStyles';

const HEIGHT = 50;

const Header = ({
  title = config.appName,
  transparent,
  leftIcon,
  leftAction,
  rightIcon,
  rightAction,
}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        transparent && styles.transparentMainContainer,
      ]}>
      <TouchableOpacity
        style={styles.lateralContainer}
        onPress={leftAction}
        disabled={!leftAction}>
        <View style={leftIcon && styles.iconContainer}>
          <Image style={styles.icon} source={leftIcon} />
        </View>
      </TouchableOpacity>
      <View style={styles.centralContainer}>
        <CustomText.Header>{title}</CustomText.Header>
      </View>
      <TouchableOpacity
        style={styles.lateralContainer}
        onPress={rightAction}
        disabled={!rightAction}>
        <View style={rightIcon && styles.iconContainer}>
          <Image style={styles.icon} source={rightIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: appStyles.secondaryColor,
    borderBottomWidth: 1,
    backgroundColor: appStyles.mainColor,
  },
  transparentMainContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    zIndex: 99,
  },
  lateralContainer: {
    height: HEIGHT,
    width: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralContainer: {
    height: HEIGHT,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: appStyles.layerColor,
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: appStyles.activeColor,
  },
});
export default Header;
