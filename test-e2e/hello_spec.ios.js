describe('Hello', () => {
  it('should render', () => {
    return wdBrowser.elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAStaticText[1]").text((err, text) => {
      expect(text).toEqual('Welcome to angular-react-native!');
    })
    .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAStaticText[2]").text((err, text) => {
      expect(text).toEqual('To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS');
    })
    .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAStaticText[3]").text((err, text) => {
      expect(text).toEqual('Show more');
    });
  });

  it('should update after a tap on button', () => {
    return wdBrowser
      .elementsByClassName("UIAStaticText").then((els) => {
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
      .elementById("Show_More").click().sleep(100)
      .elementsByClassName("UIAStaticText").then((els) => {
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