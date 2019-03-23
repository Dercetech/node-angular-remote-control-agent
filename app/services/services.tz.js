module.exports = function configure(injector) {
  injector.register('screenshotService', require('./screenshot.service'));
};
