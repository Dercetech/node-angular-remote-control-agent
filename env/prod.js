const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..', 'test', 'data');

  return { folders };
};
