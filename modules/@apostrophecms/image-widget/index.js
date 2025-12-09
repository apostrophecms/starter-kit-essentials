export default {
  styles(self, options) {
    console.log('options.myGenericColor', options.myGenericColor);
    return {
      add: {
        myBorder: 'border'
      }
    };
  }
};
