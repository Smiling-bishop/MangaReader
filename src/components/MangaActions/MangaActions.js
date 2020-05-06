import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import appStyles from '../../appStyles';
import assets from '../../assets';
import CustomText from '../CustomText';
import i18n from '../../i18n';

const MangaActions = ({chapters_len, mangaId, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          navigation.navigate('Reader', {mangaId});
        }}>
        <Image style={styles.icon} source={assets.icons.play} />
        <CustomText.Simple style={styles.textAction}>
          {i18n.t('Resume')}
        </CustomText.Simple>
      </TouchableOpacity>
      <View style={styles.separatorContainer} />
      <TouchableOpacity style={styles.actionContainer}>
        <Image style={styles.icon} source={assets.icons.list} />
        <CustomText.Simple style={styles.textAction}>{`${chapters_len} ${i18n.t(
          'Chapters',
        )}`}</CustomText.Simple>
      </TouchableOpacity>
      <View style={styles.separatorContainer} />
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {}}
        onLongPress={() => {}}>
        <Image style={styles.icon} source={assets.icons.heartEmpty} />
        <CustomText.Simple style={styles.textAction}>
          {i18n.t('Favorite')}
        </CustomText.Simple>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorContainer: {
    height: 50,
    width: 1,
    backgroundColor: appStyles.disableColor,
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: appStyles.activeColor,
  },
  textAction: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MangaActions;
