import {
  injectAsync, TestComponentBuilder, ComponentFixture,
  beforeEachProviders, beforeEach,
  iit, it, xit,
  describe, ddescribe, xdescribe,
  expect
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {HelloApp} from '../src/hello';
import {getTestingProviders, MockReactNativeWrapper, ReactNativeRootRenderer, Node, fireGesture} from 'angular2-react-native/testing';

describe('Hello', () => {
  var mock: MockReactNativeWrapper = new MockReactNativeWrapper();
  beforeEach(() => mock.reset());
  beforeEachProviders(() => getTestingProviders(mock, TestComponent));

  it('should render', injectAsync([TestComponentBuilder, ReactNativeRootRenderer], (tcb: TestComponentBuilder, _rootRenderer: ReactNativeRootRenderer) => {
    var rootRenderer = _rootRenderer;
    return tcb.overrideTemplate(TestComponent, `<hello-app></hello-app>`)
      .createAsync(TestComponent).then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        rootRenderer.executeCommands();
        expect(mock.root.toString()).toEqual(
`root:{}
  test-cmp:{}
    hello-app:{"bottom":0,"left":0,"position":"absolute","right":0,"top":0}
      native-view:{"position":"absolute","left":0,"right":0,"top":0,"bottom":0,"justifyContent":"center","alignItems":"center","backgroundColor":"#F5FCFF"}
        native-text:{"fontSize":20,"textAlign":"center","margin":10}
          native-rawtext:{"text":"Welcome to angular2-react-native!"}
        native-text:{"textAlign":"center","color":"#333333","marginBottom":5}
          native-rawtext:{"text":"To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS"}
        native-text:{"testID":"Show_More","width":100,"textAlign":"center","textAlignVertical":"center","backgroundColor":"#32BAF5","padding":10,"margin":20,"color":"white"}
          native-rawtext:{"text":"Show more"}
      native-image:{"loadingIndicatorSrc":null,"src":"./assets/angular.png","height":100,"width":100,"overflow":"hidden","position":"absolute","bottom":0,"left":0}
      native-image:{"loadingIndicatorSrc":null,"src":"./assets/react.png","height":100,"width":100,"overflow":"hidden","position":"absolute","bottom":0,"right":0}`
        );

        mock.clearLogs();
        var target = <Node>fixture.debugElement.children[0].children[1].children[0].children[5].children[0];
        fireGesture('tap', target);

        fixture.detectChanges();
        rootRenderer.executeCommands();
        expect(mock.commandLogs.toString()).toEqual('UPDATE+9+native-text+{"opacity":0.5},UPDATE+9+native-text+{"opacity":1},' +
          'CREATE+13+native-text+{"textAlign":"center","color":"#333333","marginBottom":5},' +
          'CREATE+14+native-rawtext+{"text":"To get really more, it\'s time to start coding!"},' +
          'UPDATE+10+native-rawtext+{"text":"Hide more"},' +
          'ATTACH+13+14+0,ATTACH+4+13+3');

      });
  }));
})

@Component({
  selector: 'test-cmp',
  template: `to be overriden`,
  directives: [HelloApp]
})
class TestComponent {}