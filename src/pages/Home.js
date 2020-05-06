import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CustomText from '../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux/reducer/mangaEden';
import SafeContainer from '../components/SafeContainer/SafeContainer';
import i18n from '../i18n';
import config from '../config';
import appStyles from '../appStyles';
import MangaCover from '../components/MangaCover/MangaCover';

const Home = () => {
  const mangas = useSelector(state => state.mangaEden.mangas);
  const dispatch = useDispatch();

  console.log('Redux: ', mangas);
  React.useEffect(() => {
    // dispatch(actions.getMangas("));
    // dispatch(actions.getManga('4e70ea10c092255ef7004aa2'));
    // dispatch(actions.getChapter('4e70ea10c092255ef7004aa2', "5ea2b8b4719a16656f960fce"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <SafeContainer>
      <View style={styles.headerContainer}>
        <CustomText.Header>{config.appName}</CustomText.Header>
      </View>
      <View style={styles.contentContainer}>
        {/*<MangaCover {...mangas[0]} pos={0} />*/}

        <FlatList
          data={mangas}
          numColumns={3}
          renderItem={({item}, key) => (
            <View style={styles.coverContainer}>
              <MangaCover {...item} pos={key} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    borderBottomColor: appStyles.secondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  coverContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10
  },
});

export default Home;
