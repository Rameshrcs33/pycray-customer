import React, { useEffect } from 'react';
import RiderBook from './screen/RiderBook';
import { Alert, PermissionsAndroid } from 'react-native';
import { onMessage } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      const granted: any = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging(), async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <RiderBook />;
}
