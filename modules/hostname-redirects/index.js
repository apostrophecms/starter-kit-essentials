export default {
  middleware(self) {
    return {
      redirects(req, res, next) {
        if (![ 'GET', 'HEAD' ].includes(req.method)) {
          return next();
        }
        const protocol = process.env.ENV ? 'https' : 'http';
        const portSuffix = process.env.ENV ? '' : ':3000';
        const mapping = {
          'altfr.localhost': 'fr.localhost',
          'alten.localhost': 'en.localhost'
        };
        const mapped = mapping[req.hostname];
        if (mapped) {
          return res.redirect(`${protocol}://${mapped}${portSuffix}${req.url}`);
        }
        return next();
      }
    }
  }
}