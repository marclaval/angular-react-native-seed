import {bootstrapReactNative, ROUTER_PROVIDERS, HTTP_PROVIDERS} from 'angular2-react-native';
import {HelloApp} from './hello';

bootstrapReactNative('ngRnSeed', HelloApp, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);