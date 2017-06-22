# angular-react-native-seed

A seed project to create a native mobile application with Angular and React Native

## General documentation
http://angular.github.io/react-native-renderer/

## Preparing your environment
* Set up React Native for iOS and/or Android following [Getting started](https://facebook.github.io/react-native/docs/getting-started.html) and [Android setup](https://facebook.github.io/react-native/docs/android-setup.htmlt)
* Clone this repository or a fork of it
* Install Gulp and React Native CLI globally: `npm install -g gulp react-native-cli`
* Install local npm modules: `npm install`

## Running scripts

Creating the sample project:
* `gulp init` to create the react-native project

Android:
* `gulp start.android` to launch the sample on the connected device or emulator, and watch sources for auto update (if enabled in F2/shake dev menu)
*use the `Reload JS` button after the initial red screen*

iOS:
* `gulp start.ios` to launch the sample on an emulator, and watch sources for auto update (it will fail the first due to initial compilation, simply restart it)
* OR, `gulp watch` and  open `.dist/app/ngReactNative/ios/ngReactNative.xcodeproj` in Xcode and hit `Run`

## Running unit tests
`gulp test.browser` to run tests in Chrome

## Running e2e tests
e2e tests are run with Protractor and Appium which need to be installed globally: `npm install -g protractor appium`

They can be run in dev mode or in CI mode.
The CI mode is slow as it builds a full standalone application, but can be used in SauceLabs.


### iOS

#### Dev mode
Open 3 terminals and then:
* In the first: `appium`
* In the second: `gulp start.ios`, wait for the application to be fully loaded
* In the third: `protractor protractor.conf.ios.dev.js`
You can modify the application or the tests, and run protractor again.

#### CI mode
Install xctool: `brew install xctool`
Build the application: `./scripts/build_app_ios.sh`  
Then open 2 terminals:
* In the first: `appium`
* In the second: `protractor protractor.conf.ios.ci.js`


### Android
***Experimental for now, a hack is needed in Protractor for now (remove call to `driver.manage().timeouts().setScriptTimeout(...)` in `lib/runner.js`)***

**In the configuration of the virtual device, make sure that the checkbox `Use the Host GPU` is active**

#### Dev mode
Open 3 terminals and then:
* In the first: `appium`
* In the second: `gulp start.android`, wait for the application to be fully loaded
* In the third: `protractor protractor.conf.android.dev.js`

You can modify the application or the tests, and run protractor again.


#### CI mode
Build the application: `./scripts/build_app_android.sh`
Then open 2 terminals:
* In the first: `appium`
* In the second: `protractor protractor.conf.android.ci.js`


