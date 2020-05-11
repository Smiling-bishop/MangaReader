import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux/reducer/mangaEden';
import SafeContainer from '../components/SafeContainer/SafeContainer';
import FastImage from 'react-native-fast-image';
import apiMangaEden from '../api/apiMangaEden';
import Margin from '../components/Margin/Margin';
import CustomButton from '../components/CustomButton/CustomButton';
import i18n from '../i18n';
import appStyles from '../appStyles';
import {HEADER_HEIGHT} from '../components/Header/Header';
import assets from '../assets';
import CustomText from '../components/CustomText';

const {width} = Dimensions.get('window');

const fitHeight = (w, h) => h / (w / width);

const ReaderHeader = ({goBack, mangaTitle, chapterTitle, focus}) =>
  focus ? (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack} style={styles.lateralContainer}>
        <Image style={styles.icon} source={assets.icons.chevronLeft} />
      </TouchableOpacity>
      <View style={styles.centralContainer}>
        <CustomText.Simple numberOfLines={1} ellipsizeMode={'tail'}>
          {mangaTitle}
        </CustomText.Simple>
        <CustomText.Description numberOfLines={1} ellipsizeMode={'tail'}>
          {chapterTitle}
        </CustomText.Description>
      </View>
    </View>
  ) : null;
const ReaderFooter = ({readNext, readPrevious, focus}) =>
  focus ? (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={readPrevious}
        disabled={!readPrevious}
        style={styles.lateralContainer}>
        {readPrevious && (
          <Image style={styles.icon} source={assets.icons.chevronLeft} />
        )}
      </TouchableOpacity>
      <View style={styles.centralContainer} />
      <TouchableOpacity
        onPress={readNext}
        disabled={!readNext}
        style={styles.lateralContainer}>
        {readNext && (
          <Image style={styles.icon} source={assets.icons.chevronRight} />
        )}
      </TouchableOpacity>
    </View>
  ) : null;

let timeOut = null;
const Reader = ({
  route: {
    params: {mangaId},
  },
  navigation,
}) => {
  const dispatch = useDispatch();
  const [focus, setFocus] = React.useState(false);
  const {chapters, chapters_len, latestRead, title} = useSelector(state =>
    state.mangaEden.mangas.find(item => mangaId === item.id),
  );

  React.useEffect(() => {
    if (latestRead === -1) {
      dispatch(actions.setLatestRead({mangaId: mangaId, chapterId: 0}));
      return;
    }
    const chapToLoad = chapters[latestRead];
    if (!chapToLoad.pages) {
      dispatch(actions.getChapter(mangaId, chapToLoad.id));
    }
  }, [latestRead]); // eslint-disable-line react-hooks/exhaustive-deps

  if (latestRead === -1 || !chapters[latestRead].pages) {
    return (
      <SafeContainer>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={appStyles.activeColor} size={'large'} />
        </View>
      </SafeContainer>
    );
  }

  return (
    <SafeContainer
      onStartShouldSetResponder={() => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
        setFocus(!focus);
        if (!focus) {
          timeOut = setTimeout(() => {
            setFocus(false);
          }, 3000);
        }
      }}>
      <ReaderHeader
        goBack={navigation.goBack}
        mangaTitle={title}
        chapterTitle={chapters[latestRead].title}
        focus={focus}
      />
      <FlatList
        data={chapters[latestRead].pages}
        extraData={latestRead}
        ItemSeparatorComponent={() => <Margin.Vertical height={5} />}
        ListFooterComponent={() => (
          <View style={{padding: 10}}>
            <CustomButton.Dark
              onPress={() =>
                chapters_len - 1 === latestRead
                  ? navigation.goBack()
                  : dispatch(
                      actions.setLatestRead({
                        mangaId,
                        chapterId: latestRead + 1,
                      }),
                    )
              }>
              {chapters_len - 1 === latestRead
                ? i18n.t('go-back')
                : i18n.t('next-chapter')}
            </CustomButton.Dark>
          </View>
        )}
        renderItem={({item}) => (
          <Image
            style={{
              width: '100%',
              height: fitHeight(item.width, item.height),
            }}
            source={{
              uri: apiMangaEden.getImageFromCDN(item.url),
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        keyExtractor={item => item.page.toString()}
      />
      <ReaderFooter
        focus={focus}
        readPrevious={
          latestRead - 1 >= 0 &&
          (() =>
            dispatch(
              actions.setLatestRead({
                mangaId,
                chapterId: latestRead - 1,
              }),
            ))
        }
        readNext={
          latestRead + 1 < chapters_len &&
          (() =>
            dispatch(
              actions.setLatestRead({
                mangaId,
                chapterId: latestRead + 1,
              }),
            ))
        }
      />
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    backgroundColor: appStyles.mainColor,
    flexDirection: 'row',
  },
  footerContainer: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 9,
    backgroundColor: appStyles.mainColor,
    flexDirection: 'row',
  },
  centralContainer: {
    height: HEADER_HEIGHT,
    flex: 1,
  },
  lateralContainer: {
    height: HEADER_HEIGHT,
    width: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: appStyles.activeColor,
  },
});

export default Reader;
