export default () => {
  window.TESTBED = {
    ...(window.TESTBED || {}),
    articlePageSrcPublic: true
  };
};
