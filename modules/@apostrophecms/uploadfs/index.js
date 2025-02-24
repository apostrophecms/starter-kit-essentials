module.exports = {
  options: {
    uploadfs: {
      ...(process.env.CDN
        ? {
          cdn: {
            enabled: true,
            url: process.env.CDN
          }
        }
        : {})
    }
  }
};
