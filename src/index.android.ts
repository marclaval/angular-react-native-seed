import {bootstrapReactNative, HTTP_PROVIDERS, ROUTER_PROVIDERS} from 'angular2-react-native';
import {HelloApp} from './hello';

bootstrapReactNative('ngRnSeed', HelloApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);