import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SafeContainer from '../components/SafeContainer/SafeContainer';
import appStyles from '../appStyles';
import MangaCover from '../components/MangaCover/MangaCover';
import Header from '../components/Header/Header';
import {actions} from '../redux/reducer/mangaEden';

const Home = ({navigation}) => {
  const {mangas, updating} = useSelector(state => ({
    mangas: state.mangaEden.mangas,
    updating: state.mangaEden.updating,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    //TODO smooth update while keeping previous data
    dispatch(actions.getMangas());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <SafeContainer>
      <Header />
      <View style={styles.contentContainer}>
        <FlatList
          refreshing={updating}
          data={mangas}
          numColumns={3}
          renderItem={({item, index}) => (
            <View style={styles.coverContainer}>
              <MangaCover
                {...item}
                pos={index}
                onPress={() =>
                  navigation.navigate('Manga', {id: item.id, index})
                }
              />
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
    marginVertical: 10,
  },
});

export default Home;
