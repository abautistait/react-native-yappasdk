import { NativeModules } from 'react-native';
import YappaActionButton from './components/common/YappaActionButton';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

type YappasdkType = {
  initialize(apiKey: string, appId: String): void;
  setCallbackScheme(scheme: string): void;
  setContentUrl(url: string): void;
  setContentId(id: string): void;
  setFCMToken(token: string): void;
  show(): void;
  close(): void;
  handleRemoteNotification(
    callback: (contentId?: string, contentUrl?: string) => void
  ): void;
};

const { Yappasdk } = NativeModules;

Yappasdk.handleRemoteNotification = (
  callback: (contentId?: string, contentUrl?: string) => void
) => {
  console.log('Init remote');
  const setCallback = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    Yappasdk.handleNotification(remoteMessage).then((data: any) => {
      console.log('-- data received', data);
      callback(data.contentId, data.originalUrl);
    });
  };

  messaging()
    .requestPermission()
    .then((authStatus) => {
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log('-- enabled', enabled);
      if (enabled) {
        messaging()
          .getToken()
          .then((fcmToken) => {
            if (fcmToken) {
              console.log('Your Firebase Token is:', fcmToken);
              Yappasdk.setFCMToken(fcmToken);
            } else {
              console.log('Failed', 'No token received');
            }
          });
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log('-- onMessage');
    setCallback(remoteMessage);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('-- setBackgroundMessageHandler');
    setCallback(remoteMessage);
  });
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('-- onNotificationOpenedApp');
    setCallback(remoteMessage);
  });
};

export { YappaActionButton };

export default Yappasdk as YappasdkType;
