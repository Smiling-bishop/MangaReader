const helpers = {
  decodeHtml: str =>
    str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    }),
};

export default helpers;
