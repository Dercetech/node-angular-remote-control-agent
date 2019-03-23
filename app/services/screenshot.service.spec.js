const trapezo = require('trapezo');
const chai = require('chai');
// const assert = chai.assert;
const should = chai.should();

const locals = {};

describe('The screenshot service', done => {
  before('inject dependencies and keep local copy', done => {
    trapezo.resolve(module, function(screenshotService) {
      locals.screenshotService = screenshotService;
      done();
    });
  });

  it('should  properly output an image', done => {
    done();
  });
});
