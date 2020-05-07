import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import SafeContainer from '../components/SafeContainer/SafeContainer';
import CustomText from '../components/CustomText';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import apiMangaEden from '../api/apiMangaEden';
import i18n from '../i18n';
import appStyles from '../appStyles';
import MangaActions from '../components/MangaActions/MangaActions';
import CustomButton from '../components/CustomButton/CustomButton';
import helpers from '../helpers';
import Margin from '../components/Margin/Margin';
import Header from '../components/Header/Header';
import assets from '../assets';
import Tag from '../components/Tag/Tag';
import {actions} from '../redux/reducer/mangaEden';

const MangaChapters = ({chapters_len, chapters, latestRead}) => {
  let ChapterComponent = () => {
    let list = [];

    for (let i = 1; chapters_len - i >= 0 && i <= 5; ++i) {
      list.push(
        <View key={chapters[i].id} style={styles.chapterRow}>
          <CustomText.Description
            style={{color: appStyles.secondaryColor}}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {chapters[i].title}
          </CustomText.Description>
        </View>,
      );

      if (i !== 5) {
        list.push(<View key={i} style={styles.chapterSeparator} />);
      }
    }

    return list;
  };

  if (latestRead !== null) {
  }

  return (
    <View style={styles.container}>
      <CustomText.Header2>{i18n.t('Chapters')}</CustomText.Header2>
      <Margin.Vertical height={10} />
      <ChapterComponent />
      <Margin.Vertical height={10} />
      <CustomButton.Dark>{`${i18n.t('view-all')} ${chapters_len} ${i18n.t(
        'Chapters',
      )}`}</CustomButton.Dark>
    </View>
  );
};
const MangaDescription = ({description, categories = []}) => (
  <View style={styles.container}>
    <CustomText.Header2>{i18n.t('Description')}</CustomText.Header2>
    <CustomText.Description>
      {helpers.decodeHtml(description)}
    </CustomText.Description>
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {categories.map((name, key) => {
        let rendering = [
          <Tag key={'category.' + key} style={{marginVertical: 5}}>
            {name}
          </Tag>,
        ];
        if (key !== categories.length - 1) {
          rendering.push(<Margin.Horizontal key={'margin.' + key} width={5} />);
        }

        return rendering;
      })}
    </View>
  </View>
);

const Manga = ({
  route: {
    params: {id, index},
  },
  navigation,
}) => {
  console.log(id, index);
  const {
    author,
    categories,
    chapters_len,
    chapters,
    description,
    hits,
    imageCover,
    latestRead,
    released,
    title,
  } = useSelector(state => state.mangaEden.mangas[index]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getManga(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!description) {
    return null;
  }

  return (
    <SafeContainer>
      <Header
        transparent
        title={title}
        leftAction={navigation.goBack}
        leftIcon={assets.icons.chevronLeft}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: apiMangaEden.getImageFromCDN(imageCover),
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.separator} />
        <View style={styles.smallImageContainer}>
          <FastImage
            style={styles.smallImage}
            source={{
              uri: apiMangaEden.getImageFromCDN(imageCover),
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <CustomText.Header>{title}</CustomText.Header>
        <CustomText.Description>{`${i18n.t(
          'By',
        )} ${author}`}</CustomText.Description>

        <MangaActions
          chapters_len={chapters_len}
          mangaId={index}
          latestRead={latestRead}
          navigation={navigation}
        />
        <View style={styles.colorSeparator} />
        <MangaChapters
          latestRead={latestRead}
          chapters_len={chapters_len}
          chapters={chapters}
        />
        <View style={styles.colorSeparator} />
        <MangaDescription description={description} categories={categories} />
        <View style={styles.colorSeparator} />
      </ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  separator: {
    width: '100%',
    height: 75,
  },
  smallImageContainer: {
    backgroundColor: appStyles.mainColor,
    height: 150,
    width: 100,
    position: 'absolute',
    top: 175,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  smallImage: {
    height: 136,
    width: 86,
  },
  colorSeparator: {
    width: '100%',
    height: 5,
    backgroundColor: appStyles.activeColor,
  },
  container: {
    paddingHorizontal: appStyles.marginHorizontalContent,
    paddingVertical: appStyles.marginVerticalContent,
    width: '100%',
  },
  chapterRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chapterSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: appStyles.disableColor,
  },
});

export default Manga;
