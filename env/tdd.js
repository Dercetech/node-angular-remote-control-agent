const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'test', 'data-out');

  return { folders };
};
