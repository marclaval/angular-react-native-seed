# uncomment the "OPTION 2", so the javascript bundle is used in the built app
# the packager still gets uselessly launched: https://github.com/facebook/react-native/issues/1430
sed -i '.old' -E '/^ *\/\/ *jsCodeLocation/ s/^ *\/\/*//' dist/ngRnSeed/ios/ngRnSeed/AppDelegate.m

./node_modules/.bin/gulp transpile

xctool -project dist/ngRnSeed/ios/ngRnSeed.xcodeproj/ -scheme ngRnSeed -sdk iphonesimulator9.3 clean CONFIGURATION_BUILD_DIR=$(pwd)/dist/build
xctool -project dist/ngRnSeed/ios/ngRnSeed.xcodeproj/ -scheme ngRnSeed -sdk iphonesimulator9.3 build CONFIGURATION_BUILD_DIR=$(pwd)/dist/build
zip -r dist/build/ngRnSeed.app.zip dist/build/ngRnSeed.app

# revert AppDelegate.m back to the normal development version
rm dist/ngRnSeed/ios/ngRnSeed/AppDelegate.m
mv dist/ngRnSeed/ios/ngRnSeed/AppDelegate.m.old dist/ngRnSeed/ios/ngRnSeed/AppDelegate.m