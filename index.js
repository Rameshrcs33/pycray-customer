/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
LogBox.ignoreAllLogs(true);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const RNRedux = () => (
  <Provider store={Store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
