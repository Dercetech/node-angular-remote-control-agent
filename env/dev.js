const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'data');

  throw new Error('[ENV > DEV] Missing Firebase API key. Do NOT commit/push yours to a public repo.');

  return { folders };
};
