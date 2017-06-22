describe('Hello', () => {

  beforeAll(() => {
    return wdBrowser.setImplicitWaitTimeout(3000);
  })

  it('should render', () => {
    return wdBrowser.sleep(3000).elementByXPath("//android.widget.TextView[1]").text((err, text) => {
      expect(text).toEqual('Welcome to angular-react-native!');
    })
    .elementByXPath("//android.widget.TextView[2]").text((err, text) => {
      expect(text).toEqual('To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS');
    })
    .elementByXPath("//android.widget.TextView[3]").text((err, text) => {
      expect(text).toEqual('Show more');
    });
  });

  it('should update after a tap on button', () => {
    return wdBrowser
      .elementsByClassName("android.widget.TextView").then((els) => {
        expect(els.length).toEqual(3);
        return Promise.all([
          els[0].text().then((text) => {
            expect(text).toEqual('Welcome to angular-react-native!');
          }),
          els[1].text((err, text) => {
            expect(text).toEqual('To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS');
          }),
          els[2].text((err, text) => {
            expect(text).toEqual('Show more');
          })
        ]);
      })
      .elementByXPath('//android.widget.TextView[@text=\'Show more\']').click().sleep(100)
      .elementsByClassName('android.widget.TextView').then((els) => {
        expect(els.length).toEqual(4);
        return Promise.all([
          els[2].text().then((text) => {
            expect(text).toEqual('Hide more');
          }),
          els[3].text().then((text) => {
            expect(text).toEqual('To get really more, it\'s time to start coding!');
          })
        ]);
      });
  });
});