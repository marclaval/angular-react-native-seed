exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  specs: ['test-e2e/**/*_spec.android.js'],

  capabilities: {
    browserName: '',
    platformName: 'Android',
    platformVersion: '5.1.1',
    deviceName: 'Android Emulator',
    app: './dist/build/app-release-unsigned.s.apk'
  },

  allScriptsTimeout: null,

  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }
};