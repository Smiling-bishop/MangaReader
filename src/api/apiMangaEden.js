import axios from 'axios';

const LANGUAGES = {
  english: 0,
  italian: 1,
};
const DOMAINS = {
  API: 'https://www.mangaeden.com/api/',
  CDN: 'https://cdn.mangaeden.com/mangasimg/',
};
const DEFAULT_PAGE_LENGTH = 50;

const READING_STATUS = {
  NONE: 0,
  WANTED: 1,
  READING: 2,
};

const apiMangaEden = {
  language: LANGUAGES.english,
  setLanguage: lng =>
    (apiMangaEden.language = LANGUAGES[lng] || LANGUAGES.english),
  getImageFromCDN: img => `${DOMAINS.CDN}${img}`,
  getCategories: mangas => {
    let cat = [];
    mangas.forEach(({categories}) => [...cat, ...categories]);
    return [...new Set(cat)];
  },
  sort: {
    byHits: (a, b) => b.hits - a.hits,
  },
  paginate: (mangas, page = 1, length = DEFAULT_PAGE_LENGTH) =>
    mangas.slice((page - 1) * length, length),
  reformatManga: ({im, t, i, a, s, c, ld, h}) => ({
    imageCover: im,
    title: t,
    id: i,
    alias: a,
    status: s,
    categories: c,
    latestChapterId: ld,
    hits: h,
    latestRead: -1,
    readingStatus: READING_STATUS.NONE,
  }),
  reformatMangaDetails: ({
    image,
    imageURL,
    updatedKeywords,
    random,
    ...props
  }) => ({
    ...props,
  }),
  reformatChapter: ([number, date, title, id]) => ({
    number,
    date,
    title,
    id,
    read: false,
    reading: 0,
  }),
  reformatChapterImage: ([page, url, width, height]) => ({
    page,
    url,
    width,
    height,
  }),
  endpoints: {
    listOfMangas: () => `${DOMAINS.API}list/${apiMangaEden.language}/`,
    mangaInformation: mangaId => `${DOMAINS.API}manga/${mangaId}/`,
    chapterInformation: chapterId => `${DOMAINS.API}chapter/${chapterId}/`,
  },
  apiCalls: {
    listOfMangas: async () => {
      try {
        const {data} = await axios.get(apiMangaEden.endpoints.listOfMangas());
        let mangas = data.manga.map(apiMangaEden.reformatManga);
        mangas = mangas.sort(apiMangaEden.sort.byHits);
        return mangas;
      } catch (err) {
        console.log(err);
      }
    },
    mangaInformation: async mangaId => {
      console.log('mangaInfo');
      try {
        const {data} = await axios.get(
          apiMangaEden.endpoints.mangaInformation(mangaId),
        );
        let details = apiMangaEden.reformatMangaDetails(data);
        details.chapters = details.chapters.map(apiMangaEden.reformatChapter);
        details.chapters.reverse();

        return {mangaId, details};
      } catch (err) {
        console.log(err);
      }
    },
    chapterInformation: async (mangaId, chapterId) => {
      try {
        const {data} = await axios.get(
          apiMangaEden.endpoints.chapterInformation(chapterId),
        );
        let pages = data.images;
        pages = pages.map(page => apiMangaEden.reformatChapterImage(page));
        pages.reverse();

        return {
          mangaId,
          chapterId,
          pages,
        };
      } catch (err) {
        console.log(err);
        console.log(apiMangaEden.endpoints.chapterInformation(mangaId));
      }
    },
  },
};

export default apiMangaEden;
