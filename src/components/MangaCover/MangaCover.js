import React from 'react';
import {TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import CustomText from '../CustomText';
import FastImage from 'react-native-fast-image';
import apiMangaEden from '../../api/apiMangaEden';
import appStyles from '../../appStyles';

const {width, height} = Dimensions.get('window');

const MangaCover = ({title, id, pos, imageCover, onPress}) => (
  <TouchableOpacity
    onPress={onPress || (() => {})}
    disabled={!onPress}
    style={styles.container}>
    <FastImage
      style={styles.image}
      source={{
        uri: apiMangaEden.getImageFromCDN(imageCover),
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={styles.titleContainer}>
      <CustomText.Simple numberOfLines={2} ellipsizeMode={'tail'}>
        {title}
      </CustomText.Simple>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: width / 4,
    height: height / 5,
    // borderWidth: 1,
    // borderColor: appStyles.secondaryColor,
  },
  image: {
    width: width / 4,
    height: height / 5,
  },
  titleContainer: {
    backgroundColor: appStyles.layerColor,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 5,
  },
});

export default MangaCover;
