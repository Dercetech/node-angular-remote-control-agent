const fs = require('fs');
const path = require('path');
const Promise = require('Bluebird');

const chai = require('chai');
const should = chai.should();
// const assert = chai.assert;

const trapezo = require('trapezo');
let locals;

describe('The screenshot service', done => {
  before('inject dependencies and keep local copy', done => {
    trapezo.resolve(module, function(config, screenshotService) {
      locals = {
        config,
        screenshotService,
        files: {
          basic: path.join(config.folders.data, 'basic.jpg'),
          basicFromMemory: path.join(config.folders.data, 'basic-dump.jpg'),
          basicPng: path.join(config.folders.data, 'basic.png'),
          basicPngFromMemory: path.join(config.folders.data, 'basic-dump.png')
        }
      };

      Promise.all([
        // Delete all test files
        ...Object.keys(locals.files)
          .map(key => locals.files[key])
          .map(
            file =>
              new Promise((resolve, reject) =>
                fs.unlink(file, err => (!err || err.code === 'ENOENT' ? resolve() : reject(err)))
              )
          )
      ]).then(() => done());
    });
  });

  it('should properly output a jpeg file to requested folder', done => {
    const { config, screenshotService, files } = locals;
    screenshotService
      .saveJpgScreenToFolder({ destFile: files.basic })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should properly buffer a jpeg image in memory', done => {
    const { config, screenshotService, files } = locals;
    screenshotService
      .saveJpgScreenToMemory()
      .then(
        bytes =>
          new Promise((resolve, reject) =>
            fs.appendFile(files.basicFromMemory, new Buffer(bytes), err => (err ? reject(err) : resolve()))
          )
      )
      .then(() =>
        Promise.all(
          [files.basic, files.basicFromMemory].map(
            file =>
              new Promise((resolve, reject) =>
                fs.stat(file, (err, stat) => {
                  err ? reject(err) : resolve(stat.size);
                })
              )
          )
        )
      )
      .then(([sizeA, sizeB]) => {
        Math.abs(sizeA - sizeB).should.be.below(1000);
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should properly output a png file to requested folder', done => {
    const { config, screenshotService, files } = locals;
    screenshotService
      .savePngScreenToFolder({ destFile: files.basicPng })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should properly buffer a png image in memory', done => {
    const { config, screenshotService, files } = locals;
    screenshotService
      .savePngScreenToMemory()
      .then(
        bytes =>
          new Promise((resolve, reject) =>
            fs.appendFile(files.basicPngFromMemory, new Buffer(bytes), err => (err ? reject(err) : resolve()))
          )
      )
      .then(() =>
        Promise.all(
          [files.basic, files.basicFromMemory].map(
            file =>
              new Promise((resolve, reject) =>
                fs.stat(file, (err, stat) => {
                  err ? reject(err) : resolve(stat.size);
                })
              )
          )
        )
      )
      .then(([sizeA, sizeB]) => {
        Math.abs(sizeA - sizeB).should.be.below(1000);
      })
      .then(() => done())
      .catch(err => done(err));
  });

  // Let's keep one thread per test - comment this out and re-write
  // it('should  properly output an image', done => {
  //   const { config, screenshotService } = locals;
  //   const threads = [];

  //   {
  //     const destFile = path.join(config.folders.data, 'basic.jpg');
  //     threads.push(screenshotService.saveJpgScreenToFolder({ destFile }).then(() => true));
  //   }

  //   Promise.all(threads)
  //     .then(([basicSave]) => {
  //       basicSave.should.be.true;
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});
