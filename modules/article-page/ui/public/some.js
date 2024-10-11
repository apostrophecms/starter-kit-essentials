export default () => {
  window.TESTBED = {
    ...(window.TESTBED || {}),
    articlePagePublic: true
  };
};
