import React from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SafeContainer from '../components/SafeContainer/SafeContainer';
import appStyles from '../appStyles';
import MangaCover from '../components/MangaCover/MangaCover';
import Header from '../components/Header/Header';
import {actions} from '../redux/reducer/mangaEden';
import assets from '../assets';

const FilterView = ({show}) =>
  show ? (
    <View>
      <TextInput placeholder={'Filter'} style={{color: 'white'}} />
    </View>
  ) : null;

const SearchView = ({show, onChange, value}) =>
  show ? (
    <View
      style={{
        marginHorizontal: 15,
        padding: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 10,
      }}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={'Title'}
        style={{color: 'white'}}
      />
    </View>
  ) : null;
const Home = ({navigation}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const {mangas, updating} = useSelector(state => ({
    mangas: state.mangaEden.mangas,
    updating: state.mangaEden.updating,
  }));
  const [mangaList, setMangaList] = React.useState(mangas);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //TODO smooth update while keeping previous data
    dispatch(actions.getMangas());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    let newMangas = [...mangas];
    const regExp = new RegExp(search, 'gi');
    if (search !== '') {
      newMangas = newMangas.filter(item => regExp.test(item.title));
    }
    setMangaList(newMangas);
  }, [mangas, search]);
  return (
    <SafeContainer>
      <Header
        leftIcon={assets.icons.filter}
        leftAction={() => {
          if (!showFilter) {
            setShowSearch(false);
          }
          setShowFilter(!showFilter);
        }}
        rightIcon={assets.icons.filter}
        rightAction={() => {
          if (!showSearch) {
            setShowFilter(false);
          }
          setShowSearch(!showSearch);
        }}
      />
      <View style={styles.contentContainer}>
        <FilterView show={showFilter} />
        <SearchView show={showSearch} value={search} onChange={setSearch} />

        <FlatList
          keyboardShouldPersistTaps={'handled'}
          refreshing={updating}
          data={mangaList}
          extraData={search}
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
