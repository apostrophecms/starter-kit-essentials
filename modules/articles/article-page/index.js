module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Index Page',
    pluralLabel: 'Article Index Pages',
    piecesFilters: [
      {
        name: 'genre',
        counts: true
      },
      {
        name: 'category',
        counts: true
      }
    ]
  }
};
