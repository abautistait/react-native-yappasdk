import { NativeModules } from 'react-native';
import YappaActionButton from './components/common/YappaActionButton'


type YappasdkType = {
  initialize(apiKey: string, appId: String): void;
  setCallbackScheme(scheme: string) : void;
  setContentUrl(url: string) : void;
  setContentId(id: string) : void;
  show() : void;
  close() : void;
};

const { Yappasdk } = NativeModules;

export { YappaActionButton }

export default Yappasdk as YappasdkType
