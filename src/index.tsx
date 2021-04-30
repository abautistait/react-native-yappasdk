import { NativeModules } from 'react-native';

type YappasdkType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Yappasdk } = NativeModules;

export default Yappasdk as YappasdkType;
