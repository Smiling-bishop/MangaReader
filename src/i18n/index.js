// const i18n = {
//   defaultLanguage: 'en',
//   language: i18n.defaultLanguage,
//   fallbackLanguage: 'en',
//   dictionaries: {
//     en: require('./languages/en.json'),
//   },
//   t: key => {
//     try {
//       const word =
//         i18n.dictionaries[i18n.language][key] ||
//         i18n.dictionaries[i18n.fallbackLanguage][key];
//
//       if (!word) {
//         throw new Error(
//           `${i18n.language}: ${i18n.dictionaries[i18n.language].hasOwnProperty(
//             key,
//           )} | ${i18n.language}: ${i18n.dictionaries[
//             i18n.fallbackLanguage
//           ].hasOwnProperty(key)}`,
//         );
//       }
//
//       return word;
//     } catch (err) {
//       console.log(err);
//       return key;
//     }
//   },
// };
//
// export default i18n;
