export default {
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
}
