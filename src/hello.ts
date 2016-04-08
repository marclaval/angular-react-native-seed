import {Component} from 'angular2/core';
import {OpacityFeedback} from 'angular2-react-native';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'hello-app',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  directives: [OpacityFeedback],
  template: `
<View [styleSheet]="styles.container">
  <Text [styleSheet]="styles.welcome">
    Welcome to angular2-react-native!
  </Text>
  <Text [styleSheet]="styles.instructions">
    To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS
  </Text>
  <Text [styleSheet]="styles.button" opacityFeedback (tap)="showMore=!showMore" testID="Show_More">
    {{showMore ? 'Hide more' : 'Show more'}}
  </Text>
  <Text *ngIf="showMore" [styleSheet]="styles.instructions">
    To get really more, it's time to start coding!
  </Text>
</View>
<Image [styleSheet]="styles.image" [style]="{left: 0}" [source]="angularLogo"></Image>
<Image [styleSheet]="styles.image" [style]="{right: 0}" [source]="reactLogo" ></Image>
`
})
export class HelloApp {
  angularLogo: any = require('./assets/angular.png');
  reactLogo: any = require('./assets/react.png');
  showMore: boolean = false;
  styles: any;
  constructor() {
    this.styles = StyleSheet.create({
      container: {
        position: 'absolute',
        left: 0,
        right:0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      button: {
        width: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#32BAF5',
        padding: 10,
        margin: 20,
        color: 'white'
      },
      image: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0
      }
    });
  }
}

