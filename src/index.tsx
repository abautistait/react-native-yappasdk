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
    callback: (contentId: string, contentUrl: string, showSdk: () => void) => void
  ): void;
};

const { Yappasdk } = NativeModules;

Yappasdk.handleRemoteNotification = (callback: (contentId: string, contentUrl: string, showSdk: () => void) => void) => {
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
    Yappasdk.handleNotificationForeground(remoteMessage);
  });
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('-- onNotificationOpenedApp');

    if(remoteMessage.data){
      const contentId = remoteMessage.data.contentId;
      const contentUrl = remoteMessage.data.originalUrl;

      callback(contentId || "", contentUrl || "", () => {
        Yappasdk.handleNotification(remoteMessage)
      });
    }


  });
};

export { YappaActionButton };

export default Yappasdk as YappasdkType;
