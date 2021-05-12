import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import YappaSDK, { YappaActionButton } from 'react-native-yappasdk';

export default function App() {
  YappaSDK.initialize('aefab81bcc7b2e83d619b6e8f90a6029', '1'); // AppID
  YappaSDK.setCallbackScheme('com.yappa.ios');
  YappaSDK.handleRemoteNotification((contentId: string, contentUrl: string, showSdk) => {
      console.log('Received ', contentId, contentUrl);
      // Handle app navigation
      showSdk();
    }
  );

  return (
    <View style={styles.container}>
      <Text>YappaSDK React Native</Text>
      <YappaActionButton
        contentUrl="https://qa-site.yappaapp.com/a-emo/"
        contentId=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
