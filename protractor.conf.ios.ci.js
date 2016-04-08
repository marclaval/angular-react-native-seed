exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  specs: ['test-e2e/**/*_spec.ios.js'],

  capabilities: {
    browserName: '',
    platformName: 'iOS',
    platformVersion: '9.3',
    deviceName: 'iPhone Simulator',
    app: './dist/build/ngRnSeed.app.zip'
  },

  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }
};