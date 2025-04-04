module.exports = {
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const data = _super(req);
        if (data.user) {
          data.user.role = req.user.role;
        }
        return data;
      }
    };
  }
}