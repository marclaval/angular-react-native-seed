import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactNativeAndroidModule} from 'angular-react-native';
import {HelloApp} from './hello';

@NgModule({
  declarations: [HelloApp],
  imports: [ReactNativeAndroidModule, CommonModule],
  bootstrap: [HelloApp]
})
export class HelloModule {}