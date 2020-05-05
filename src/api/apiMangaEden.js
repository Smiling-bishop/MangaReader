const LANGUAGES = {
  english: 0,
  italian: 1,
};
const DOMAINS = {
  API: 'https://www.mangaeden.com/api/',
  CDN: 'https://cdn.mangaeden.com/mangasimg/',
};
const DEFAULT_PAGE_LENGTH = 50;

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
  }),
  reformatChapter: ([number, date, title, id]) => ({number, date, title, id}),
  endpoints: {
    listOFMangas: () => `${DOMAINS.API}list/${apiMangaEden.language}/`,
    mangaInformation: mangaId => `${DOMAINS.API}manga/${mangaId}/`,
    chapterInformation: chapterId => `${DOMAINS.API}chapter/${chapterId}/`,
  },
};

export default apiMangaEden;
