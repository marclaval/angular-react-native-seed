import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactNativeModule} from 'angular2-react-native';
import {HelloApp} from './hello';

@NgModule({
  declarations: [HelloApp],
  imports: [ReactNativeModule, CommonModule],
  bootstrap: [HelloApp]
})
export class HelloModule {}