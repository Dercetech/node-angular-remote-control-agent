// Thanks to Ben C. Evans for this lib https://www.npmjs.com/package/screenshot-desktop
const screenshot = require('screenshot-desktop');

module.exports = function diFactory() {
  function saveJpgScreenToFolder({ destFile }) {
    return screenshot({ format: 'jpg', filename: destFile });
  }

  function saveJpgScreenToMemory() {
    return screenshot({ format: 'jpg' });
  }

  function savePngScreenToFolder({ destFile }) {
    return screenshot({ format: 'png', filename: destFile });
  }

  function savePngScreenToMemory() {
    return screenshot({ format: 'png' });
  }

  return {
    saveJpgScreenToFolder,
    saveJpgScreenToMemory,
    savePngScreenToFolder,
    savePngScreenToMemory
  };
};
